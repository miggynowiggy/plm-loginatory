<template>
  <div class="about">
    <div class="greetings">
      <v-card 
        class="elevation-4 pa-3"
        id="greetingsCard"
      >
        <div>
          <p class="text-left text-uppercase">
            Welcome to <span class="primary--text">{{ lab.labName }}</span> Laboratory! ({{ lab.bldg }})
          </p>
        </div>
      </v-card>
      
      <div class="instruction">Tap your ID Card to Login/Logout...</div>
      <div id="subInstruction">
        or <!--<span id="click" @click="txtBoxToggle = !txtBoxToggle">CLICK HERE</span> to--> manually enter your student number below....
      </div>
      
      <div id="textBox">
        <v-layout row>
          <v-flex xs12>
            <v-text-field 
              v-model="idNum"
              solo
              outlined
              dense
              rounded
              focusable
              color="primary"
              label="Enter Your Student Number"
              placeholder="ex. 201812345"
              append-outer-icon="check"
              clearable
              :loading="loading"
              @keyup.enter="submitID"
              @click:append-outer="submitID"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="primary--text" v-if="showError || !loading">
            <p class="text-left font-weight-bold">{{ errorMessage }}</p>
          </v-flex>
        </v-layout>
      </div>
      <div>
        <v-btn color="primary" depressed small @click="logout">LOGOUT</v-btn>
      </div>
    </div>
    
    <v-layout class="clock">
      <v-flex xs2>
        <digiClock/>
      </v-flex>
    </v-layout>
    
    <div class="humans">
      <svg width="325" height="403" viewBox="0 0 525 603" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
          <rect x="44.0098" y="20.796" width="251" height="516" rx="9" transform="rotate(-2 44.0098 20.796)" fill="#FFFCFA"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M79.6722 30.5574C66.2598 31.0257 55.7667 42.2783 56.235 55.6906L71.7555 500.138C72.2238 513.551 83.4764 524.044 96.8888 523.576L276.453 517.305C289.866 516.837 300.359 505.584 299.89 492.172L284.37 47.724C283.902 34.3116 272.649 23.8185 259.237 24.2868L231.243 25.2644L231.385 29.313C231.65 36.9133 225.704 43.2897 218.104 43.5551L122.738 46.8854C115.138 47.1508 108.761 41.2047 108.496 33.6043L108.355 29.5558L79.6722 30.5574Z" fill="#B28B67"/>
        <circle cx="276.51" cy="256.5" r="10.5" fill="#6E5339"/>
        <path d="M107.51 29L232.01 25V49.5L107.51 56.5V29Z" fill="#B28B67"/>
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="54" y="9" width="338" height="515">
          <rect x="54.9982" y="20.1329" width="319" height="504" transform="rotate(-2 54.9982 20.1329)" fill="white"/>
        </mask>
        <g mask="url(#mask0)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M289.835 136.871C293.172 149.361 298.762 159.239 303.351 161.842C314.857 168.368 348.215 135.521 353.901 115.363C359.588 95.2055 328.52 54.0237 301.278 78.5359C291.823 87.0433 287.795 98.8939 287.047 111.015L231.184 148.518L260.715 177.035L289.835 136.871Z" fill="#E7C6A7"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M369.441 106.305C363.103 112.868 352.774 113.254 345.955 107.337C341.141 104.897 335.563 101.133 329.935 96.3826C328.587 98.8057 326.751 101.265 324.362 103.739C322.252 105.924 319.773 108.008 317.056 109.932C317.224 107.464 316.548 105.095 314.992 103.592C310.64 99.389 304.156 100.039 300.49 103.836C295.837 108.654 295.256 114.83 299.053 119.036C288.612 122.519 278.443 122.915 273.383 118.029C263.773 108.748 269.331 89.3172 282.654 75.5209C283.122 75.0362 283.597 74.564 284.077 74.1044C278.671 73.1922 272.834 73.2034 266.955 73.2148C254.463 73.2389 241.782 73.2633 232.635 64.4304C214.334 46.7576 242.665 2.87573 268.233 27.5672C285.622 44.3592 291.731 55.151 295.486 66.0135C300.893 63.3243 306.433 62.0238 311.465 62.2384C312.825 62.135 314.502 62.3991 316.42 62.9945C317.625 63.3251 318.78 63.7622 319.873 64.308C325.894 66.9695 333.445 72.037 340.88 78.732C342.268 79.9822 343.6 81.2423 344.87 82.5022C351.428 75.754 362.221 75.5855 369.003 82.1353C375.799 88.6976 375.995 99.5188 369.441 106.305Z" fill="#191847"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8129 413.476C28.8129 413.476 85.4199 443.117 129.089 452.399C172.758 461.681 215.727 443.697 215.727 443.697C215.727 443.697 160.503 413.886 122.39 405.784C84.2764 397.683 28.8129 413.476 28.8129 413.476Z" fill="#68A1AC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M160.384 475.971C160.12 475.307 159.928 474.604 159.815 473.863C157.469 458.529 104.109 287.135 101.501 257.318L198.223 277.877C200.205 300.547 201.1 440.355 199.557 467.883C203.626 512.687 201.463 654.531 202.876 664.69C204.363 675.377 181.933 681.413 179.134 668.069C174.681 646.835 165.655 588.783 163.524 554.055C161.526 521.498 160.457 492.363 160.384 475.971Z" fill="#E7C6A7"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M77.2776 477.848C35.8896 479.434 -111.592 466.856 -122.05 467.578C-132.808 468.32 -137.253 445.509 -123.754 443.642C-102.275 440.671 -43.7725 435.693 -9.00397 435.977C18.9617 436.206 44.3685 436.943 61.3446 437.82C69.7652 391.363 86.9528 279.233 96.2065 256.193L181.787 274.384C172.914 296.478 103.542 456.705 93.7003 472.127C90.4358 477.686 83.9273 479.066 77.2776 477.848Z" fill="#E7C6A7"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M96.4831 256.252C96.4831 256.252 156.495 252.079 203.532 279.006C203.877 334.955 227.816 362.22 215.397 445.247C152.517 461.437 92.5641 398.059 28.1603 413.192C19.633 371.063 62.7955 283.145 96.4831 256.252Z" fill="#89C5CC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M293.807 398.301L278.88 332.32L250.236 346.878L276.336 399.201C276.107 422.75 277.653 433.994 280.974 432.931C283.774 432.035 284.418 429.478 285.011 427.123C285.473 425.289 285.904 423.576 287.3 422.867C290.487 421.247 298.006 428.243 304.857 435.186C311.709 442.13 312.406 437.009 312.036 433.86C308.436 422.869 302.36 411.016 293.807 398.301ZM16.9214 300.268C26.6563 294.481 94.8799 220.767 94.8799 220.767L124.782 240.353C124.782 240.353 38.8876 311.833 33.1179 315.872C25.6228 321.12 23.793 334.628 22.5522 343.788C22.3602 345.205 22.1824 346.518 21.9998 347.68C16.0721 346.75 15.4767 342.835 14.849 338.708C14.14 334.046 13.3898 329.113 4.86862 327.904C1.57647 327.436 -1.7189 327.271 -4.93845 327.11C-16.0595 326.554 -26.2758 326.042 -32.33 313.268C-33.2898 311.243 -32.6324 306.392 -26.5118 306.242C-11.263 305.869 12.1622 303.097 16.9214 300.268Z" fill="#E7C6A7"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M261.653 150.469L275.438 156.4C262.195 223.549 268.043 296.174 292.983 374.276L221.085 396.951C208.137 300.397 216.878 215.131 261.653 150.469Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M106.479 271.032L216.939 342.765C216.939 342.765 239.083 224.628 281.392 159.477L251.292 132.88C197.792 157.934 156.768 204.915 106.479 271.032Z" fill="#DDE3E9"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5686 285.702C126.036 157.443 250.56 132.405 250.56 132.405L250.571 132.446C250.581 132.441 250.59 132.436 250.6 132.431L252.775 133.843C256.591 136.513 264.353 142.05 264.353 142.05L257.482 170.257C231.469 213.109 162.408 349.323 162.408 349.323L90.1055 302.369C86.4365 308.288 82.8633 314.386 79.4078 320.666L25.5686 285.702Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M89.7513 302.941C105.688 277.138 123.452 254.729 141.252 235.569C126.573 262.488 110.657 296.014 109.894 316.023L89.7513 302.941Z" fill="black" fill-opacity="0.1"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M134.591 268.92L181.06 275.53L170.295 292.107L134.591 268.92Z" fill="white" fill-opacity="0.2"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M398.406 255.53C390.864 256.068 384.339 254.86 382.027 252.818C376.23 247.698 388.055 222.974 398.122 215.981C408.189 208.987 436.87 218.317 428.492 238.067C425.584 244.921 419.796 249.411 413.235 252.139L403.114 290.202L381.729 279.307L398.406 255.53Z" fill="#E7C6A7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M395.447 197.812C396.682 196.481 398.553 195.755 400.359 196.178C400.797 196.28 401.219 196.446 401.611 196.667C401.752 196.745 401.771 196.807 401.89 196.741C401.977 196.692 402.071 196.511 402.136 196.434C402.339 196.194 402.556 195.966 402.787 195.754C403.578 195.032 404.546 194.529 405.565 194.21C407.473 193.613 409.63 193.629 411.496 194.384C412.517 194.797 413.407 195.451 414.169 196.24C414.564 196.648 414.924 197.09 415.26 197.547C415.361 197.684 415.633 198.244 415.78 198.291C415.943 198.344 416.437 198.124 416.608 198.092C418.717 197.702 420.822 198.198 422.703 199.174C424.826 200.276 426.824 201.428 427.939 203.633C428.176 204.1 428.38 204.584 428.56 205.075C428.655 205.333 428.74 205.595 428.815 205.86C428.859 206.02 428.9 206.181 428.936 206.343C428.996 206.618 428.938 206.669 429.23 206.647C430.35 206.563 431.465 206.825 432.401 207.457C432.957 207.832 433.443 208.304 433.872 208.817C434.018 208.992 434.287 209.53 434.484 209.634C434.68 209.738 435.256 209.66 435.497 209.688C436.801 209.842 438.034 210.345 439.092 211.12C440.183 211.919 441.109 212.989 441.783 214.158C442.107 214.72 442.352 215.285 442.452 215.927C442.496 216.205 442.519 216.486 442.59 216.759C442.631 216.918 442.766 217.129 442.748 217.295C442.759 217.196 444.353 217.361 444.495 217.392C445.254 217.559 445.918 217.942 446.463 218.491C447.49 219.526 448.086 220.976 448.483 222.353C448.686 223.06 448.808 223.79 448.853 224.523C448.874 224.875 448.878 225.227 448.867 225.579C448.862 225.75 448.817 225.944 448.839 226.111C448.867 226.326 448.939 226.367 449.102 226.538C449.932 227.406 450.547 228.473 450.835 229.638C451.127 230.818 451.073 232.059 450.726 233.218C450.705 233.287 450.58 233.549 450.599 233.602C450.626 233.674 450.839 233.756 450.911 233.805C451.161 233.971 451.402 234.152 451.631 234.347C452.053 234.705 452.435 235.11 452.765 235.554C454.054 237.285 454.472 239.511 454.159 241.617C453.83 243.827 452.717 245.984 451.017 247.451C450.742 247.688 450.449 247.904 450.138 248.092C449.947 248.207 449.913 248.19 449.891 248.402C449.867 248.637 449.908 248.899 449.9 249.137C449.874 249.915 449.74 250.685 449.524 251.431C449.169 252.655 448.677 253.881 447.894 254.898C447.531 255.37 447.101 255.794 446.605 256.126C446.352 256.296 446.082 256.442 445.802 256.561C445.656 256.622 445.507 256.676 445.356 256.724C445.27 256.751 445.169 256.762 445.088 256.8C444.89 256.893 444.929 256.753 444.876 257.01C444.802 257.37 444.838 257.781 444.802 258.149C444.764 258.528 444.712 258.905 444.649 259.281C444.521 260.042 444.356 260.799 444.119 261.533C443.665 262.944 442.92 264.314 441.694 265.197C441.169 265.574 440.562 265.83 439.925 265.946C439.614 266.002 439.295 266.026 438.979 266.017C438.816 266.012 438.635 265.953 438.51 266.05C438.377 266.153 438.334 266.473 438.278 266.636C437.792 268.059 437.178 269.5 436.122 270.598C435.149 271.61 433.811 272.26 432.417 272.43C429.712 272.762 427.037 271.303 425.475 269.138C425.068 268.574 424.731 267.959 424.482 267.31C422.507 268.29 420.121 267.012 418.637 265.69C416.788 264.042 415.832 261.686 415.839 259.234C413.653 260.189 411.094 258.214 411.066 255.956C411.059 255.403 411.168 254.853 411.349 254.333C411.444 254.059 411.598 253.813 411.701 253.546C411.832 253.205 411.776 252.781 411.811 252.405C411.88 251.674 412.05 250.969 412.378 250.309C412.549 249.964 412.763 249.653 412.969 249.329C413.154 249.038 413.214 248.71 413.32 248.383C413.821 248.752 414.563 248.944 415.16 249.048C415.745 249.15 416.428 248.982 416.976 248.789C418.248 248.342 419.336 247.46 420.26 246.502C422.29 244.398 423.501 241.251 421.692 238.608C420.849 237.377 417.352 235.598 415.802 235.204C414.172 234.79 410.872 237.171 410.636 237.432C410.49 237.594 410.397 237.839 410.161 237.877C409.642 237.958 409.261 237.163 409.101 236.785C408.826 236.134 408.758 235.418 408.739 234.718C408.698 233.194 408.828 231.647 409.124 230.152C409.352 229 409.7 227.868 409.828 226.696C409.955 225.531 409.816 224.36 409.189 223.344C408.508 222.238 407.538 221.344 406.646 220.413C405.762 219.49 404.939 218.494 404.511 217.274C404.417 217.005 404.334 216.729 404.291 216.448C404.258 216.226 404.301 215.856 404.176 215.662C403.982 215.361 403.367 215.573 403.052 215.603C401.494 215.751 399.982 216.293 398.61 217.028C397.246 217.759 396.045 218.52 394.876 219.516C394.008 220.256 393.154 221.333 392.077 221.752C391.597 221.94 389.218 220.989 388.635 220.315C388.051 219.64 387.623 218.442 387.624 217.829C387.625 217.201 387.844 216.622 388.231 216.131C388.458 215.842 388.741 215.608 388.973 215.328C389.167 215.094 389.349 214.871 389.602 214.693C390.081 214.358 390.668 214.24 391.242 214.358C390.964 213.608 390.824 212.808 390.853 212.008C390.883 211.177 391.034 210.225 391.335 209.45C391.579 208.82 391.989 208.247 392.579 207.9C393.198 207.535 393.987 207.493 394.686 207.425C394.201 206.385 393.903 205.268 393.768 204.131C393.507 201.92 393.885 199.493 395.447 197.812Z" fill="#191847"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M384.01 364L334.928 488.227L302.009 593.25H289.01L339.336 364L384.01 364Z" fill="#E7C6A7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M393.893 364C394.416 407.654 402.038 466.427 403.256 469.149C404.473 471.87 487.334 538.358 487.334 538.358L478.381 547.939C478.381 547.939 380.613 490.934 376.089 483.331C371.565 475.728 356.835 405.763 345.01 364H393.893Z" fill="#E7C6A7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M485.894 536.564C486.221 535.44 487.406 534.771 488.506 535.173C490.512 535.906 493.446 537.092 494.746 538.183C496.818 539.922 500.214 543.948 500.214 543.948C498.197 546.352 463.959 587.154 463.959 587.154C463.959 587.154 456.978 584.166 459.579 580.165C462.18 576.164 463.836 573.464 463.836 573.464L471.734 545.87C471.889 545.328 472.461 545.022 472.998 545.192L477.212 546.529C477.212 546.529 481.598 544.485 483.36 542.384C484.433 541.106 485.345 538.448 485.894 536.564Z" fill="#E4E4E4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M304.56 587.284C305.632 586.813 306.905 587.29 307.305 588.391C308.033 590.398 309.01 593.409 309.01 595.106C309.01 597.811 308.109 603 308.109 603C304.971 603 251.707 603 251.707 603C251.707 603 249.508 595.732 254.245 595.152C258.982 594.573 262.115 594.106 262.115 594.106L288.33 582.419C288.844 582.189 289.447 582.43 289.661 582.951L291.347 587.039C291.347 587.039 295.732 589.085 298.473 589.085C300.142 589.085 302.764 588.074 304.56 587.284Z" fill="#E4E4E4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M351.01 582.433L289.205 575.725L335.01 364H390.366L351.01 582.433Z" fill="#69A1AC"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M474.55 522.9L434.01 570.886C434.01 570.886 369.96 500.932 359.327 479.596C348.695 458.26 340.211 364 340.211 364H402.532C402.532 364 407.166 446.926 408.779 450.785C410.393 454.644 474.55 522.9 474.55 522.9Z" fill="#89C5CC"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M282.335 300.141L313.643 324.347L298.831 335.93L277.533 309.176C264.983 303.481 259.401 299.885 260.787 298.388C261.955 297.125 263.471 297.416 264.867 297.683C265.955 297.891 266.97 298.086 267.692 297.521C269.34 296.233 267.489 290.52 265.502 285.175C263.514 279.829 266.403 280.725 267.982 281.698C272.922 286.32 277.706 292.468 282.335 300.141ZM433.857 363.027L454.723 364.039C459.346 402.943 462.53 424.423 464.273 428.482C465.551 431.458 475.675 440.826 482.757 446.247C485.599 448.422 484.243 450.945 483.094 451.573C475.843 455.538 470.837 452.267 465.387 448.705C463.81 447.675 462.195 446.619 460.478 445.708C456.033 443.35 453.984 445.427 452.047 447.39C450.333 449.128 448.706 450.776 445.584 449.178C445.897 448.565 446.264 447.883 446.66 447.146C449.22 442.383 452.995 435.36 451.254 430.298C450.36 427.7 444.561 405.277 433.857 363.027Z" fill="#E7C6A7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M399.347 271.217L391.316 267.686C368.621 280.857 350.545 321.587 336.96 324.188C324.117 326.647 309.08 317.42 291.414 305.618L282.162 317.412C295.036 340.88 328.574 366.357 346.091 360.954C374.096 352.315 392.812 301.188 399.347 271.217Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M409.633 385.777C409.633 385.777 359.171 373.195 335.395 367.267C332.002 366.421 333.863 361.682 334.969 359.332C347.742 332.216 377.502 306.974 387.626 266.366L409.877 268.347C420.487 301.25 417.868 337.85 409.633 385.777Z" fill="#DDE3E9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M411.014 268.631L411.259 268.692C451.91 310.266 469.498 363.385 464.022 428.049L447.701 427.217C440.388 412.638 432.567 389.812 424.239 358.74C424.782 376.342 423.967 394.054 421.048 410.265L354.222 393.604C349.436 357.684 402.78 266.578 402.78 266.578L407.394 267.728L411.014 268.631Z" fill="white"/>
        <defs>
        <filter id="filter0_d" x="0.00976562" y="0.0362549" width="336.855" height="592.445" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dx="-10" dy="22"/>
        <feGaussianBlur stdDeviation="17"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
      </svg>
    </div>

    <div class="bgShapes">
      <svg id="bigCircle" width="134" height="133" viewBox="0 0 734 733" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
        <path fill-rule="evenodd" d="M266.51 525C411.485 525 529.01 407.475 529.01 262.5C529.01 117.525 411.485 0 266.51 0C121.535 0 4.00977 117.525 4.00977 262.5C4.00977 407.475 121.535 525 266.51 525Z" fill="#6EE5BC"/>
        <!-- <path fill-rule="evenodd" d="M266.51 525C411.485 525 529.01 407.475 529.01 262.5C529.01 117.525 411.485 0 266.51 0C121.535 0 4.00977 117.525 4.00977 262.5C4.00977 407.475 121.535 525 266.51 525Z" stroke="black"/> -->
        </g>
      </svg>
      
      <svg id="smallStar" width="99" height="98" viewBox="0 0 99 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M49.0098 0L98.0098 49L49.0098 98L0.00976562 49L49.0098 0Z" fill="#FFEBD3"/>
      </svg>

      <svg id="lowerStar" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0098 0L48.0098 24L24.0098 48L0.00976562 24L24.0098 0Z" fill="#9CBCBA"/>
      </svg>

      <svg id="lowerCircle" width="91" height="90" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M45.0098 82C67.6534 82 86.0098 63.6437 86.0098 41C86.0098 18.3563 67.6534 0 45.0098 0C22.3661 0 4.00977 18.3563 4.00977 41C4.00977 63.6437 22.3661 82 45.0098 82Z" fill="#FBFF33"/>
        </g>
      </svg>

      <svg id="smallestStar" width="99" height="98" viewBox="0 0 99 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M49.0098 0L98.0098 49L49.0098 98L0.00976562 49L49.0098 0Z" fill="#E5C46E"/>
      </svg>

      <svg id="sideStar" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0098 0L48.0098 24L24.0098 48L0.00976562 24L24.0098 0Z" fill="#FFEBD3"/>
      </svg>

      <svg id="upperCircle" width="91" height="90" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M45.0098 82C67.6534 82 86.0098 63.6437 86.0098 41C86.0098 18.3563 67.6534 0 45.0098 0C22.3661 0 4.00977 18.3563 4.00977 41C4.00977 63.6437 22.3661 82 45.0098 82Z" fill="#9CBCBA"/>
        </g>
      </svg>

      <svg id="smallestStar2" width="99" height="98" viewBox="0 0 99 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M49.0098 0L98.0098 49L49.0098 98L0.00976562 49L49.0098 0Z" fill="#E5C46E"/>
      </svg>

    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css';
import anime from 'animejs/lib/anime.es.js';
import digiClock from '@/components/digiClock.vue';
import http from "@/http-common";
import { mapState } from "vuex";
import ReasonEncodingVue from './ReasonEncoding.vue';
//const anime = require('anime');

export default {
  mounted() {
    
  },

  data: () => ({
    loading: false,
    idNum: null,
    showError: false,
    errorMessage: ""
  }),

  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push('/');
    },

    async submitID() {
      this.loading = true;
      this.showError = false;
      this.errorMessage = "";
      
      let status = null;
      let stuDetails = null;
      let response = null;

      if(!this.idNum || this.idNum === " ") {
        this.showError = true;
        this.errorMessage = "Please Provide Your Student Number...";
        this.loading = false;
        return;
      }

      try {
        response = await http.get("/students/" + this.idNum);
        stuDetails = response.data;
        console.log("FROM BACKEND: ", stuDetails);
        this.loading = false;
      }
      catch(error) {
        console.log("FETCHING STUDENT DETAILS ERROR: ", error);
        this.loading = false;
      }

      try {
        response = await http.post("/attendance/check", {visitorID: this.idNum, labID: this.lab.labID});
        status = response.data;
        console.log("FROM BACKEND: ", status);
        this.loading = false;
      }
      catch(error) {
        console.log("ATTENDANCE CHECK ERROR: ", error);
        this.loading = false;
      }

      //console.log("AFTER TRY-CATCH");

      if(stuDetails && status == "loggedOUT") {
        console.log("push to /reason");
        this.$router.push(
          {
            name: 'reasonEncoding',
            params: 
              {
                stuDetails,
                labID: this.lab.labID
              }
          }
        );
      }
      else if(stuDetails && status == "loggedIN") {
        console.log("push to /confirmExit");
        console.log("STUDETAILS: ", stuDetails);

        try {
          const response = await http.post("/attendance/add", {visitorID: this.idNum, labID: this.lab.labID});
          console.log("LOGGED OUT SUCCESSFULLY: ", response.data);
        }
        catch(error) {
          console.log("ERROR IN LOGGING OUT: ", error);
        }

        this.$router.push(
          {
            name: 'confirmExit',
            params: { stuDetails: stuDetails }
          }
        );
      }
      else {
        console.log("ito ang salarin!");
        this.showError = true;
        this.errorMessage = "Student Number is INVALID!";
      }
      this.loading = false;
    }
  },

  computed: {
    lab() {
      return this.$store.getters.GET_CURRENT_LAB;
    },

    notBlank() {
      return !this.idNum;
    }
  },

  components: {
    digiClock
  }
}
</script>

<style scoped>

  #clock {
    position: absolute;
    left: 100px;
    top: 25px;
    width: 300px;
  }

  .greetings {
    position: absolute;
    left: 80px;
    top: 110px;
  }

  #greetingsCard {
    width: 560px;
    height: 198px;
    background-color: #FFFDC1;
    
    font-family: Avenir LT Std;
    font-style: normal;
    font-weight: bold;
    font-size: 54px;
    line-height: 58px;
    color: #494949;
  }

  .instruction {
    font-family: Avenir LT Std;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 101px;
    color: #4D9AA9;
  }

  #subInstruction {
    margin-top: -15px;
    font-family: Avenir LT Std;
    font-style: italic;
    font-weight: 300;
    font-size: 20px;
    line-height: 33px;
  }

  #click {
    font-style: normal;
    font-weight: bold;
    color: #4D9AA9;
  }

  #click:hover {
    text-decoration: underline;
  }

  #textBox {
    margin-top: 30px;
    width: 280px;
    margin-left: 10px;
  }

  .humans {
    animation: 2s rotateRight ease-in-out infinite alternate;
    position: absolute;
    width: 400px;
    height: 500px;
    left: 800px;
    top: 100px;
    z-index: 3;
  }

  .bgShapes {
    position: absolute;
    z-index: 0;
  }

  #bigCircle {
    animation: slideUp 3s ease-in-out infinite alternate;
    position: absolute;
    width: 540px;
    height: 450px;
    left: 850px;
    top: 80px;

    mix-blend-mode: normal;
    opacity: 0.25;
  }

  #smallStar {
    animation: 3s slideDown ease-in-out infinite alternate-reverse;
    animation-delay: 4s;
    position: absolute;
    width: 58px;
    height: 58px;
    left: 980px;
    top: 43px;
  }

  #lowerStar {
    animation: 3s slideDown ease-in-out infinite alternate;
    animation-delay: 2s;
    position: absolute;
    width: 28px;
    height: 28px;
    left: 870px;
    top: 460px;
  }

  #lowerCircle {
    animation: 3s slideDown ease-in-out infinite alternate-reverse;
    animation-delay: 4s;
    position: absolute;
    width: 63px;
    height: 63px;
    left: 1050px;
    top: 490px;
    opacity: 0.45;
  }

  #smallestStar {
    animation: 3s slideDown ease-in-out infinite alternate;
    animation-delay: 2s;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 1140px;
    top: 78px;
    opacity: 0.65;
  }

  #smallestStar2 {
    animation: 3s slideDown ease-in-out infinite alternate-reverse;
    animation-delay: 4s;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 1120px;
    top: 400px;
    opacity: 0.65;
  }

  #sideStar {
    animation: 3s slideDown ease-in-out infinite alternate;
    animation-delay: 2s;
    position: absolute;
    width: 88px;
    height: 88px;
    left: 1178px;
    top: 260px;
    z-index: -1;
  }

  #upperCircle {
    animation: 3s slideDown ease-in-out infinite alternate-reverse;
    animation-delay: 3s;
    position: absolute;
    width: 35px;
    height: 35px;
    left: 1238px;
    top: 160px;
    opacity: 0.65;
  }

  @keyframes slideUp {
    0% {
      margin-top: 0px;
    }

    100% {
      margin-top: 30px;
    }
  }

  @keyframes slideDown {
    0% {
      margin-top: 0px;
    }

    100% {
      margin-top: 25px;
    }
  }

  @keyframes rotateRight {
    from {transform: rotate(0deg);}
    to {transform: rotate(4deg);}
  }

  @keyframes rotateLeft {
    from {transform: rotate(0deg);}
    to {transform: rotate(-4deg);}
  }
</style>
