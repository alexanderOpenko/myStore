<?php function icon($icon_name) {
  $svg = "";
  switch ($icon_name) {
    case 'close':
      $svg = '<svg role="presentation" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M2.5 2.5871L21.5 21.5871" stroke="black"></path><path d="M21.5 2.5871L2.5 21.5871" stroke="black"></path></svg>';
      break;
    case "star":
      $svg = "";
      break;
    default:
      return "Неверное название иконки";
   }

   return $svg;
}
?>