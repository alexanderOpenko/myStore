<?php function icon($icon_name)
{
  $svg = "";
  switch ($icon_name) {
    case 'close':
      $svg = '<svg role="presentation" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M2.5 2.5871L21.5 21.5871" stroke="black"></path><path d="M21.5 2.5871L2.5 21.5871" stroke="black"></path></svg>';
      break;
    case "star":
      "";
      break;
    case  'arrow_down':
      $svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/></svg>';
      break;
    case 'instagram':
      $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.87009 0.122868C4.24207 0.195869 2.83006 0.593873 1.69104 1.72888C0.548033 2.8689 0.155029 4.28591 0.0810283 5.89693C0.0360278 6.90194 -0.231975 14.498 0.544033 16.49C0.797887 17.1512 1.18824 17.7515 1.68965 18.2517C2.19106 18.7519 2.79226 19.1408 3.45406 19.3931C4.08807 19.6391 4.81008 19.8051 5.87009 19.8541C14.7302 20.2551 18.0152 20.0371 19.4002 16.49C19.6462 15.859 19.8152 15.137 19.8622 14.08C20.2672 5.19692 19.7962 3.2709 18.2522 1.72888C17.0272 0.506872 15.5862 -0.325136 5.87009 0.122868ZM5.95109 18.0671C4.98108 18.024 4.45507 17.862 4.10307 17.726C3.67327 17.5633 3.28281 17.3113 2.95739 16.9867C2.63197 16.6622 2.37898 16.2724 2.21505 15.843C1.62404 14.329 1.82005 7.13994 1.87305 5.97693C1.92405 4.83692 2.15505 3.79691 2.95906 2.9919C3.95407 1.99989 5.24008 1.51288 13.9932 1.90789C15.1352 1.95989 16.1792 2.18989 16.9852 2.9919C17.9802 3.98491 18.4742 5.27992 18.0722 14C18.0282 14.968 17.8662 15.493 17.7302 15.843C16.8292 18.1511 14.7572 18.4711 5.95109 18.0671ZM14.0902 4.68992C14.0902 5.34692 14.6242 5.87993 15.2842 5.87993C15.9442 5.87993 16.4792 5.34692 16.4792 4.68992C16.4792 4.37298 16.3533 4.06902 16.1292 3.84491C15.9051 3.62081 15.6011 3.4949 15.2842 3.4949C14.9672 3.4949 14.6633 3.62081 14.4392 3.84491C14.2151 4.06902 14.0892 4.37298 14.0892 4.68992H14.0902ZM4.86308 9.98797C4.86386 10.6582 4.99667 11.3217 5.25391 11.9406C5.51116 12.5595 5.8878 13.1217 6.36232 13.595C6.83685 14.0683 7.39996 14.4435 8.01951 14.6992C8.63906 14.9548 9.3029 15.0859 9.97313 15.085C10.6433 15.0858 11.307 14.9546 11.9264 14.6989C12.5459 14.4431 13.1089 14.0679 13.5833 13.5946C14.0577 13.1213 14.4343 12.5592 14.6914 11.9404C14.9486 11.3215 15.0814 10.6581 15.0822 9.98797C15.0814 9.31779 14.9486 8.65433 14.6913 8.03549C14.4341 7.41665 14.0574 6.85456 13.5829 6.38132C13.1083 5.90808 12.5452 5.53297 11.9257 5.27742C11.3061 5.02186 10.6423 4.89087 9.97213 4.89192C9.30195 4.89087 8.63813 5.02186 8.01859 5.27742C7.39904 5.53297 6.83592 5.90808 6.36138 6.38132C5.88684 6.85456 5.51019 7.41665 5.25293 8.03549C4.99568 8.65433 4.86286 9.31779 4.86208 9.98797H4.86308ZM6.6561 9.98797C6.65742 9.10964 7.00747 8.26779 7.62929 7.64747C8.25111 7.02715 9.0938 6.67914 9.97213 6.67994C10.8506 6.67887 11.6936 7.02677 12.3156 7.64712C12.9377 8.26747 13.2878 9.10947 13.2892 9.98797C13.2888 10.4231 13.2027 10.8539 13.0357 11.2558C12.8688 11.6577 12.6244 12.0227 12.3163 12.3301C12.0083 12.6375 11.6427 12.8812 11.2405 13.0472C10.8383 13.2133 10.4073 13.2985 9.97213 13.298C9.53706 13.2984 9.10616 13.2131 8.70406 13.047C8.30195 12.8808 7.9365 12.6371 7.62858 12.3298C7.32066 12.0224 7.07629 11.6574 6.90943 11.2556C6.74257 10.8538 6.65649 10.423 6.6561 9.98797Z" fill="#232323"></path>
  </svg>';
      break;
    case 'telegram':
      $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z"/></svg>';
      break;
    case 'viber':
      $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 24.425781 3 C 23.0625 3.007813 21.695313 3.089844 20.316406 3.257813 C 17.679688 3.582031 15.066406 4.121094 12.558594 5.273438 C 8.570313 7.105469 5.742188 10.214844 4.921875 14.734375 C 4.574219 16.640625 4.292969 18.574219 4.132813 20.519531 C 3.824219 24.296875 4.015625 28.085938 5.085938 31.808594 C 5.929688 34.742188 7.484375 37.378906 10.207031 39.089844 C 11.359375 39.8125 12.878906 40.164063 13.671875 40.53125 C 13.894531 40.636719 13.949219 40.699219 13.960938 40.714844 C 13.972656 40.726563 14.003906 40.753906 14 40.988281 C 13.972656 43.378906 14 48.003906 14 48.003906 L 14.003906 49 L 15.789063 49 L 16.078125 48.71875 C 16.078125 48.71875 20.613281 44.355469 22.253906 42.558594 C 22.550781 42.238281 22.703125 42.058594 22.734375 42.039063 C 22.761719 42.019531 22.714844 42.007813 23.019531 42 C 25.171875 41.957031 27.320313 41.875 29.46875 41.757813 C 32.300781 41.601563 35.1875 41.332031 37.964844 40.171875 C 40.382813 39.160156 42.402344 37.507813 43.625 35.03125 C 44.875 32.492188 45.542969 29.800781 45.792969 27.015625 C 46.207031 22.378906 46.0625 17.734375 44.78125 13.15625 C 44.027344 10.472656 42.511719 8.203125 40.1875 6.601563 C 37.40625 4.6875 34.269531 3.96875 31.199219 3.511719 C 29.40625 3.246094 27.601563 3.070313 25.789063 3.015625 C 25.335938 3.003906 24.882813 2.996094 24.425781 3 Z M 25.734375 5.015625 C 27.457031 5.0625 29.179688 5.230469 30.90625 5.488281 C 33.867188 5.929688 36.660156 6.601563 39.054688 8.25 C 40.996094 9.585938 42.207031 11.390625 42.855469 13.691406 C 44.050781 17.972656 44.203125 22.359375 43.800781 26.839844 C 43.570313 29.421875 42.957031 31.855469 41.828125 34.148438 C 40.832031 36.171875 39.277344 37.457031 37.191406 38.328125 C 34.769531 39.339844 32.136719 39.609375 29.363281 39.761719 C 27.238281 39.878906 25.109375 39.957031 22.980469 40 C 22.445313 40.011719 21.921875 40.152344 21.550781 40.425781 C 21.179688 40.699219 21.011719 40.953125 20.78125 41.203125 C 19.609375 42.484375 17.273438 44.738281 16 45.972656 C 15.992188 44.480469 15.980469 42.675781 16 41.011719 C 16.007813 40.5 15.890625 39.976563 15.597656 39.5625 C 15.304688 39.148438 14.902344 38.898438 14.515625 38.71875 C 13.386719 38.195313 11.910156 37.796875 11.269531 37.394531 C 9.03125 35.988281 7.761719 33.878906 7.007813 31.253906 C 6.019531 27.820313 5.832031 24.285156 6.125 20.6875 C 6.28125 18.820313 6.550781 16.949219 6.890625 15.09375 C 7.601563 11.183594 9.835938 8.722656 13.390625 7.089844 C 15.636719 6.058594 18.035156 5.550781 20.5625 5.242188 C 22.285156 5.03125 24.007813 4.964844 25.734375 5.015625 Z M 26.15625 10 C 25.332031 10 24.53125 10.09375 23.753906 10.265625 C 23.21875 10.390625 22.878906 10.925781 23 11.464844 C 23.121094 12.003906 23.660156 12.339844 24.199219 12.21875 C 24.828125 12.074219 25.484375 12 26.15625 12 C 31.039063 12 34.976563 15.9375 34.976563 20.816406 C 34.976563 21.492188 34.902344 22.148438 34.757813 22.78125 C 34.636719 23.316406 34.972656 23.855469 35.511719 23.976563 C 36.050781 24.097656 36.585938 23.757813 36.707031 23.21875 C 36.882813 22.445313 36.976563 21.644531 36.976563 20.816406 C 36.976563 14.855469 32.121094 10 26.15625 10 Z M 16.179688 12.003906 C 16.015625 11.996094 15.847656 12.007813 15.671875 12.046875 C 13.855469 12.449219 12.050781 13.765625 12 16.117188 C 12.050781 16.445313 12.046875 16.796875 12.167969 17.09375 C 12.761719 18.546875 13.277344 20.046875 14.019531 21.421875 C 17.632813 28.101563 23.097656 32.746094 30.0625 35.695313 C 30.894531 36.046875 31.753906 36.121094 32.59375 35.769531 C 33.75 35.289063 34.730469 34.546875 35.382813 33.480469 C 36.277344 32.015625 36.289063 31 34.816406 29.917969 C 33.851563 29.207031 32.902344 28.476563 31.925781 27.78125 C 30.4375 26.726563 28.828125 26.542969 27.71875 28.394531 C 27.660156 28.488281 27.574219 28.566406 27.5 28.644531 C 26.929688 29.25 26.230469 29.398438 25.488281 29.09375 C 22.671875 27.933594 20.496094 26.0625 19.183594 23.277344 C 18.410156 21.640625 18.621094 20.820313 20.066406 19.730469 C 20.210938 19.625 20.347656 19.511719 20.480469 19.390625 C 21.113281 18.8125 21.28125 18.125 20.90625 17.347656 C 20.058594 15.574219 18.929688 13.992188 17.5 12.628906 C 17.113281 12.261719 16.671875 12.03125 16.179688 12.003906 Z M 26.140625 13 C 25.699219 13 25.261719 13.035156 24.832031 13.109375 C 24.46875 13.15625 24.160156 13.398438 24.027344 13.738281 C 23.894531 14.082031 23.960938 14.46875 24.195313 14.75 C 24.433594 15.027344 24.808594 15.15625 25.167969 15.078125 C 25.480469 15.027344 25.808594 15 26.140625 15 C 29.390625 15 32 17.609375 32 20.859375 C 32 21.191406 31.972656 21.519531 31.921875 21.832031 C 31.84375 22.191406 31.972656 22.566406 32.25 22.804688 C 32.53125 23.039063 32.917969 23.105469 33.261719 22.972656 C 33.601563 22.839844 33.84375 22.53125 33.890625 22.167969 C 33.964844 21.738281 34 21.300781 34 20.859375 C 34 16.53125 30.46875 13 26.140625 13 Z M 26 16 C 25.640625 15.996094 25.304688 16.183594 25.121094 16.496094 C 24.941406 16.808594 24.941406 17.191406 25.121094 17.503906 C 25.304688 17.816406 25.640625 18.003906 26 18 C 27.667969 18 29 19.332031 29 21 C 28.996094 21.359375 29.183594 21.695313 29.496094 21.878906 C 29.808594 22.058594 30.191406 22.058594 30.503906 21.878906 C 30.816406 21.695313 31.003906 21.359375 31 21 C 31 18.25 28.75 16 26 16 Z"/></svg>';
      break;
    default:
      return "Неверное название иконки";
  }

  return $svg;
}



