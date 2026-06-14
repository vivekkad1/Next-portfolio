"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});

// ── Inline SVG icons ──────────────────────────────────────────────────
const Icons: Record<string, ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 14.646L9.5 8H8v8h1.5v-5.354l5.896 7.608A8 8 0 0 1 12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 7.97 7.97 0 0 1-1.707 4.646zM14.5 8H16v5l-1.5-1.94V8z"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="#3178C6" width="28" height="28">
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M13.5 15.5v1.6c.3.15.65.27 1.06.35.4.08.83.12 1.27.12.43 0 .84-.05 1.23-.14.39-.1.73-.25 1.02-.47.29-.22.52-.5.69-.85.17-.35.25-.77.25-1.27 0-.37-.05-.69-.16-.96a2.1 2.1 0 0 0-.45-.71 3.2 3.2 0 0 0-.72-.54 8.7 8.7 0 0 0-.96-.46 6.7 6.7 0 0 1-.63-.3 1.8 1.8 0 0 1-.39-.28.9.9 0 0 1-.2-.32.98.98 0 0 1-.06-.36c0-.12.02-.23.07-.33.05-.1.12-.18.21-.25s.21-.12.35-.16c.14-.04.3-.06.48-.06.13 0 .26.01.4.03.14.02.27.06.4.11.13.05.25.12.37.2.12.08.22.18.3.3V12c-.27-.1-.57-.18-.9-.23a6.1 6.1 0 0 0-1.04-.08c-.42 0-.82.05-1.2.14-.38.1-.71.25-1 .46-.28.21-.51.48-.67.8-.17.33-.25.72-.25 1.17 0 .57.16 1.06.47 1.45.32.4.8.73 1.45 1.01l.67.28c.2.09.38.18.52.27.14.1.25.2.33.32.08.12.12.26.12.43 0 .12-.02.24-.07.34-.05.1-.12.19-.22.26-.1.07-.22.13-.37.17-.15.04-.32.06-.52.06-.34 0-.67-.06-.99-.19-.32-.13-.6-.32-.85-.58zM9.5 10.26H12V8.5H5v1.76h2.5V17H9.5v-6.74z" fill="white"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" fill="#38BDF8" width="28" height="28">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C13.26 10.44 14.28 11.5 16.5 11.5c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C15.24 7.06 14.22 6 12 6zm-4.5 6C5.1 12 3.6 13.2 3 15.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C8.76 16.44 9.78 17.5 12 17.5c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C10.74 13.06 9.72 12 7.5 12z"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" width="28" height="28">
      <path d="M12 2C9.46 2 7.5 2.93 7.5 4.5V6H12v.5H4.5C2.93 6.5 2 8.46 2 11c0 2.54.93 4.5 2.5 4.5H6v-2c0-1.57.93-2.5 2.5-2.5H15.5C17.07 11 18 10.07 18 8.5V4.5C18 2.93 16.07 2 14 2h-2zm-1.5 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#3776AB"/>
      <path d="M18 9.5v2c0 1.57-.93 2.5-2.5 2.5H8.5C6.93 14 6 14.93 6 16.5v4c0 1.57 1.93 2.5 4 2.5h2c2.54 0 4.5-.93 4.5-2.5V19H12v-.5h7.5c1.57 0 2.5-1.96 2.5-4.5 0-2.54-.93-4.5-2.5-4.5H18zm-4.5 9a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#FFD43B"/>
    </svg>
  ),
  HTML: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
      <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
      <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
    </svg>
  ),
  CSS: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
      <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
      <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
      <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/>
      <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/>
      <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.33-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/>
    </svg>
  ),
  JavaScript: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
      <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
    </svg>
  ),
  SQL: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <defs>
        <linearGradient id="sqlCylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="20%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="80%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="sqlLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Bottom Cylinder */}
      <path d="M 24 80 v 18 c 0 6.63 17.9 12 40 12 s 40 -5.37 40 -12 V 80 Z" fill="url(#sqlCylinderGrad)" />
      <ellipse cx="64" cy="80" rx="40" ry="12" fill="url(#sqlLidGrad)" />
      
      {/* Middle Cylinder */}
      <path d="M 24 52 v 18 c 0 6.63 17.9 12 40 12 s 40 -5.37 40 -12 V 52 Z" fill="url(#sqlCylinderGrad)" />
      <ellipse cx="64" cy="52" rx="40" ry="12" fill="url(#sqlLidGrad)" />
      
      {/* Top Cylinder */}
      <path d="M 24 24 v 18 c 0 6.63 17.9 12 40 12 s 40 -5.37 40 -12 V 24 Z" fill="url(#sqlCylinderGrad)" />
      <ellipse cx="64" cy="24" rx="40" ry="12" fill="url(#sqlLidGrad)" />
    </svg>
  ),
  MongoDB: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <path fillRule="evenodd" clipRule="evenodd" fill="#439934" d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051-.169-24.252 1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#45A538" d="M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#46A037" d="M88.038 42.812c-1.384.206-2.768.403-4.149.616-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-.859-.144-1.717-.154-2.576-.069-5.478-.112-10.956-.18-16.434-.042-3.429-.105-6.857-.175-10.285-.043-2.13-.089-4.261-.185-6.388-.052-1.143-.236-2.28-.311-3.423-.042-.657.016-1.319.029-1.979.817 1.583 1.616 3.178 2.456 4.749 1.327 2.484 3.441 4.314 5.344 6.311 7.523 7.892 12.864 17.068 16.193 27.433z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#409433" d="M65.036 80.753c.081-.026.222-.034.235-.08.491-1.682 1.996-1.431 3.212-1.641 3.432-.594 6.875-1.13 10.313-1.687 3.326-.539 6.652-1.081 9.981-1.604.394-.062.805-.011 1.208-.012-.622 2.22-1.112 4.488-1.901 6.647-.896 2.449-1.98 4.839-3.131 7.182a49.142 49.142 0 01-6.353 9.763c-1.919 2.308-4.058 4.441-6.202 6.548-1.185 1.165-2.582 2.114-3.882 3.161l-.337-.23-1.214-1.038-1.256-2.753a41.402 41.402 0 01-1.394-9.838l.023-.561.171-2.426c.057-.828.133-1.655.168-2.485.129-2.982.241-5.964.359-8.946z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#4FAA41" d="M65.036 80.753c-.118 2.982-.23 5.964-.357 8.947-.035.83-.111 1.657-.168 2.485l-.765.289c-1.699-5.002-3.399-9.951-5.062-14.913-2.75-8.209-5.467-16.431-8.213-24.642a4498.887 4498.887 0 00-6.7-19.867c-.105-.31-.407-.552-.617-.826l4.896-9.002c.168.292.39.565.496.879a6167.476 6167.476 0 016.768 20.118c2.916 8.73 5.814 17.467 8.728 26.198.116.349.308.671.491 1.062l.67-.78-.167 10.052z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#4AA73C" d="M43.155 32.227c.21.274.511.516.617.826a4498.887 4498.887 0 016.7 19.867c2.746 8.211 5.463 16.433 8.213 24.642 1.662 4.961 3.362 9.911 5.062 14.913l.765-.289-.171 2.426-.155.559c-.266 2.656-.49 5.318-.814 7.968-.163 1.328-.509 2.632-.772 3.947-.198-.287-.476-.548-.583-.866-5.467-16.297-10.918-32.6-16.376-48.9a3888.972 3888.972 0 00-5.242-15.551c-.089-.263-.34-.469-.516-.702l3.272-8.84z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#57AE47" d="M65.202 70.702l-.67.78c-.183-.391-.375-.714-.491-1.062-2.913-8.731-5.812-17.468-8.728-26.198a6167.476 6167.476 0 00-6.768-20.118c-.105-.314-.327-.588-.496-.879l6.055-7.965c.191.255.463.482.562.769 1.681 4.921 3.347 9.848 5.003 14.778 1.547 4.604 3.071 9.215 4.636 13.813.105.308.47.526.714.786l.012 1.045c.058 8.082.115 16.167.171 24.251z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#60B24F" d="M65.021 45.404c-.244-.26-.609-.478-.714-.786-1.565-4.598-3.089-9.209-4.636-13.813-1.656-4.93-3.322-9.856-5.003-14.778-.099-.287-.371-.514-.562-.769 1.969-1.928 3.877-3.925 5.925-5.764 1.821-1.634 3.285-3.386 3.352-5.968.003-.107.059-.214.145-.514l.519 1.306c-.013.661-.072 1.322-.029 1.979.075 1.143.259 2.28.311 3.423.096 2.127.142 4.258.185 6.388.069 3.428.132 6.856.175 10.285.067 5.478.111 10.956.18 16.434.008.861.098 1.718.152 2.577z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#A9AA88" d="M62.598 107.085c.263-1.315.609-2.62.772-3.947.325-2.649.548-5.312.814-7.968l.066-.01.066.011a41.402 41.402 0 001.394 9.838c-.176.232-.425.439-.518.701-.727 2.05-1.412 4.116-2.143 6.166-.1.28-.378.498-.574.744l-.747-2.566.87-2.969z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#B6B598" d="M62.476 112.621c.196-.246.475-.464.574-.744.731-2.05 1.417-4.115 2.143-6.166.093-.262.341-.469.518-.701l1.255 2.754c-.248.352-.59.669-.728 1.061l-2.404 7.059c-.099.283-.437.483-.663.722l-.695-3.985z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#C2C1A7" d="M63.171 116.605c.227-.238.564-.439.663-.722l2.404-7.059c.137-.391.48-.709.728-1.061l1.215 1.037c-.587.58-.913 1.25-.717 2.097l-.369 1.208c-.168.207-.411.387-.494.624-.839 2.403-1.64 4.819-2.485 7.222-.107.305-.404.544-.614.812-.109-1.387-.22-2.771-.331-4.158z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#CECDB7" d="M63.503 120.763c.209-.269.506-.508.614-.812.845-2.402 1.646-4.818 2.485-7.222.083-.236.325-.417.494-.624l-.509 5.545c-.136.157-.333.294-.398.477-.575 1.614-1.117 3.24-1.694 4.854-.119.333-.347.627-.525.938-.158-.207-.441-.407-.454-.623-.051-.841-.016-1.688-.013-2.533z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#DBDAC7" d="M63.969 123.919c.178-.312.406-.606.525-.938.578-1.613 1.119-3.239 1.694-4.854.065-.183.263-.319.398-.477l.012 3.64-1.218 3.124-1.411-.495z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#EBE9DC" d="M65.38 124.415l1.218-3.124.251 3.696-1.469-.572z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#CECDB7" d="M67.464 110.898c-.196-.847.129-1.518.717-2.097l.337.23-1.054 1.867z"/>
      <path fillRule="evenodd" clipRule="evenodd" fill="#4FAA41" d="M64.316 95.172l-.066-.011-.066.01.155-.559-.023.56z"/>
    </svg>
  ),

  Git: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
      <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.08.39-1.97 1.03-2.67-.1-.25-.45-1.26.1-2.64 0 0 .83-.27 2.73 1.02a9.58 9.58 0 0 1 5 0c1.9-1.3 2.73-1.02 2.73-1.02.55 1.38.2 2.39.1 2.64.64.7 1.03 1.58 1.03 2.67 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
};

const SKILLS = [
  { name: "HTML",           icon: "HTML" },
  { name: "CSS",            icon: "CSS" },
  { name: "JavaScript",     icon: "JavaScript" },
  { name: "Tailwind CSS",    icon: "Tailwind" },
  { name: "React",           icon: "React" },
  { name: "TypeScript",      icon: "TypeScript" },
  { name: "Next.js",         icon: "Next.js" },
  { name: "SQL",             icon: "SQL" },
  { name: "MongoDB",         icon: "MongoDB" },
  { name: "Python",          icon: "Python" },
  { name: "Git",             icon: "Git" },
  { name: "GitHub",          icon: "GitHub" },
];

const PROCESS = [
  { num: "01", label: "Understand", desc: "Define the problem space, user needs, and constraints before writing code." },
  { num: "02", label: "Architect",  desc: "Design data flow, API shape, component hierarchy. No premature optimization." },
  { num: "03", label: "Build",      desc: "Ship iteratively. Prioritize correctness and DX. Refactor with evidence." },
  { num: "04", label: "Polish",     desc: "Performance audit, a11y sweep, edge cases, and that final 10% that matters." },
];

export default function SkillsSection() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      style={{
        paddingBlock: "var(--section-pad)",
        background: "var(--bg-surface)",
        position: "relative",
      }}
    >
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />

      <div className="page-wrap" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={fadeUp(0)}
          className="section-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: "0.75rem" }}>Stack &amp; Process</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08 }}>
              How I<br /><span style={{ color: "var(--accent)" }}>build.</span>
            </h2>
          </div>
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
            sys.skills.load()
          </span>
        </motion.div>

        {/* Two-column: skill groups + process */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }} className="skills-layout">

          {/* Left: skill groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp(0)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--bg-border)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid var(--bg-border)",
                background: "var(--bg-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.9 }} />
                <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Tech Stack
                </span>
              </div>

              {/* Icon grid */}
              <div style={{
                padding: "1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "0.75rem",
              }}>
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.9rem 0.5rem",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--bg-border)",
                      borderRadius: 6,
                      cursor: "default",
                      transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                      (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                      {Icons[skill.icon]}
                    </div>
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.3 }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: process */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp(0.15)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--bg-border)",
              borderRadius: 8,
              padding: "1.75rem",
              position: "sticky",
              top: "calc(var(--nav-height) + 1.5rem)",
            }}
          >
            <p className="label" style={{ marginBottom: "1.5rem" }}>My Process</p>
            <div>
              {PROCESS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    paddingBlock: "1rem",
                    borderBottom: i < PROCESS.length - 1 ? "1px solid var(--bg-border-subtle)" : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="font-mono" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                    {step.num}
                  </span>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.3rem" }}>{step.label}</p>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--bg-border-subtle)" }}>
              <p className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>// currently exploring</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["Rust", "WebAssembly", "LLM Agents"].map((t) => (
                  <span key={t} className="tag" style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-dim)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .skills-layout { grid-template-columns: 1fr !important; }
          .skills-layout > div:last-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
