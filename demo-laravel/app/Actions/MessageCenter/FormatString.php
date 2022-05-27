<?php

namespace App\Actions\MessageCenter;

use VStelmakh\UrlHighlight\UrlHighlight;

class FormatString
{
  private const TYPE_MARKDOWN = [
    'bold' => '*',
    'italic' => '_',
    'strike' => '~',
    'underline' => '°',
    'noformat' => '|'
  ];

  private const PSEUDO_MARKDOWN = [
    FormatString::TYPE_MARKDOWN['bold'] => [
      'end' => '\\' . FormatString::TYPE_MARKDOWN['bold'],
      'allowed_chars' => '.',
      'type' => 'bold'
    ],
    FormatString::TYPE_MARKDOWN['italic'] => [
      'end' => FormatString::TYPE_MARKDOWN['italic'],
      'allowed_chars' => '.',
      'type' => 'italic'
    ],
    FormatString::TYPE_MARKDOWN['strike'] => [
      'end' => FormatString::TYPE_MARKDOWN['strike'],
      'allowed_chars' => '.',
      'type' => 'strike'
    ],
    FormatString::TYPE_MARKDOWN['underline'] => [
      'end' => FormatString::TYPE_MARKDOWN['underline'],
      'allowed_chars' => '.',
      'type' => 'underline'
    ],
    FormatString::TYPE_MARKDOWN['noformat'] => [
      'end' => '\\' . FormatString::TYPE_MARKDOWN['noformat'],
      'allowed_chars' => '.',
      'type' => 'noformat'
    ]
  ];

  public static function Format($text, $doLinkify = true)
  {
    $json = FormatString::compileToJSON($text);

    $html = FormatString::compileToHTML($json);

    $result = [];
    array_walk($html, function ($a) use (&$result) {
      if (isset($a[0])) $result = array_merge($result, $a);
      else $result[] = $a;
    });

    if ($doLinkify) $result = FormatString::linkifyResult($result);

    $output = '';
    foreach ($result as $el) {
      if (!mb_strlen($el['value'])) continue;

      $str = $el['value'];
      if (in_array('url', $el['types'], true)) {
        $href = $el['href'];
        if (mb_strpos($href, 'http://') !== 0 && mb_strpos($href, 'https://') !== 0) {
          $href = 'http://' . $href;
        }
        $str = "<a target='_blank' href='$href'>$str</a>";
      }
      if (in_array('bold', $el['types'], true)) {
        $str = "<b>$str</b>";
      }
      if (in_array('italic', $el['types'], true)) {
        $str = "<i>$str</i>";
      }
      if (in_array('strike', $el['types'], true)) {
        $str = "<s>$str</s>";
      }
      if (in_array('underline', $el['types'], true)) {
        $str = "<u>$str</u>";
      }

      $output .= $str;
    }

    return $output;
  }

  private static function compileToJSON($str)
  {
    if (!mb_strlen($str)) return [];

    $result = [];
    $minIndexOf = -1;
    $minIndexOfKey = null;

    $urlHighlight = new UrlHighlight();
    $links = $urlHighlight->getUrls($str);

    $minIndexFromLink = false;
    if (!empty($links)) {
      $minIndexOf = mb_strpos($str, $links[0]);
      $minIndexFromLink = true;
    }

    foreach (FormatString::PSEUDO_MARKDOWN as $startingValue => $val) {
      $io = mb_strpos($str, $startingValue);
      if ($io !== false && ($minIndexOf < 0 || $io < $minIndexOf)) {
        $minIndexOf = $io;
        $minIndexOfKey = $startingValue;
        $minIndexFromLink = false;
      }
    }

    if ($minIndexFromLink) {
      $strLeft = mb_substr($str, 0, $minIndexOf);
      $strLink = mb_substr($str, $minIndexOf, mb_strlen($links[0]));
      $strRight = mb_substr($str, $minIndexOf + mb_strlen($links[0]));

      if (mb_strlen($strLeft)) array_push($result, $strLeft);
      array_push($result, $strLink);
      $result = array_merge($result, FormatString::compileToJSON($strRight));
      return $result;
    }

    if ($minIndexOfKey) {
      $strLeft = mb_substr($str, 0, $minIndexOf);
      $char = $minIndexOfKey;
      $strRight = mb_substr($str, $minIndexOf + mb_strlen($char));

      if (mb_strlen(mb_ereg_replace("\s", '', $str)) === mb_strlen($char) * 2) {
        return [$str];
      }

      $pattern = '/^(' .
        FormatString::PSEUDO_MARKDOWN[$char]['allowed_chars'] .
        '*?)(' . FormatString::PSEUDO_MARKDOWN[$char]['end'] . ')/m';
      preg_match($pattern, $strRight, $match);

      if (empty($match) || !mb_strlen($match[1])) {
        $strLeft = $strLeft . $char;
        array_push($result, $strLeft);
      } else {
        if (mb_strlen($strLeft)) {
          array_push($result, $strLeft);
        }

        $type = FormatString::PSEUDO_MARKDOWN[$char]['type'];
        if ($type === 'noformat') {
          $content = [$match[1]];
        } else {
          $content = FormatString::compileToJSON($match[1]);
        }

        $tmp = [
          'start' => $char,
          'content' => $content,
          'end' => $match[2],
          'type' => $type
        ];
        array_push($result, $tmp);
        $strRight = mb_substr($strRight, mb_strlen($match[0]));
      }
      $result = array_merge($result, FormatString::compileToJSON($strRight));
      return $result;
    } else {
      return [$str];
    }
  }

  private static function compileToHTML($json)
  {
    $result = [];

    foreach ($json as $item) {
      if (is_string($item)) {
        array_push($result, ['types' => [], 'value' => $item]);
      } else {
        if (isset(FormatString::PSEUDO_MARKDOWN[$item['start']])) {
          array_push($result, FormatString::parseContent($item));
        }
      }
    }

    return $result;
  }

  private static function parseContent($item)
  {
    $result = [];

    foreach ($item['content'] as $it) {
      if (is_string($it)) {
        array_push($result, ['types' => [$item['type']], 'value' => $it]);
      } else {
        $subres = FormatString::parseContent($it);
        foreach ($subres as $sr) {
          array_push($result, ['types' => array_merge([$item['type']], $sr['types']), 'value' => $sr['value']]);
        }
      }
    }

    return $result;
  }

  private static function linkifyResult($array)
  {
    $result = [];
    $pattern = "/.*\\[(.+)\\]$/";
    $urlHighlight = new UrlHighlight();

    foreach ($array as $arr) {
      $links = $urlHighlight->getUrls($arr['value']);

      if (!empty($links)) {
        $spaces = str_replace($links[0], '', $arr['value']);
        if (mb_strlen($spaces)) array_push($result, ['types' => $arr['types'], 'value' => $spaces]);

        $arr['types'] = array_merge(['url'], $arr['types']);
        $arr['href'] = $links[0];
        $arr['value'] = $links[0];

        if (!empty($result)) {
          $prev = &$result[count($result) - 1];
          preg_match($pattern, $prev['value'], $match);
          if (!empty($match)) {
            $arr['value'] = trim($match[1]);
            $prev['value'] = mb_substr($prev['value'], 0, mb_strlen($prev['value']) - mb_strlen($match[1]) - 2);
          }
        }
      }

      array_push($result, $arr);
    }

    return $result;
  }
}
