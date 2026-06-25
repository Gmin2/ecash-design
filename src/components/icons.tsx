// nucleo icons, inlined and recoloured to currentColor (no lucide-react)
type P = { className?: string }

function Outline({
  vb,
  sw,
  className = "h-5 w-5",
  children,
}: {
  vb: string
  sw: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <svg
      viewBox={vb}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function Brand({ className = "h-5 w-5", children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  )
}

export const IconMenu = ({ className }: P) => (
  <Outline vb="0 0 24 24" sw={2} className={className}>
    <line x1="2" y1="5" x2="22" y2="5" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </Outline>
)

export const IconClose = ({ className }: P) => (
  <Outline vb="0 0 12 12" sw={1.5} className={className}>
    <line x1="2.25" y1="9.75" x2="9.75" y2="2.25" />
    <line x1="9.75" y1="9.75" x2="2.25" y2="2.25" />
  </Outline>
)

export const IconChevronDown = ({ className }: P) => (
  <Outline vb="0 0 24 24" sw={2} className={className}>
    <polyline points="6 9 12 15 18 9" />
  </Outline>
)

export const IconArrowRight = ({ className }: P) => (
  <Outline vb="0 0 20 20" sw={2} className={className}>
    <line x1="3" y1="10" x2="17" y2="10" />
    <polyline points="12 15 17 10 12 5" />
  </Outline>
)

export const IconDownload = ({ className }: P) => (
  <Outline vb="0 0 20 20" sw={2} className={className}>
    <polyline points="12.75 10.25 10 13 7.25 10.25" />
    <line x1="10" y1="3" x2="10" y2="13" />
    <path d="m13.285,7c1.541,0,2.832,1.168,2.985,2.701l.4,4c.177,1.766-1.21,3.299-2.985,3.299h-7.37c-1.775,0-3.162-1.532-2.985-3.299l.4-4c.153-1.534,1.444-2.701,2.985-2.701" />
  </Outline>
)

export const IconNodes = ({ className }: P) => (
  <Outline vb="0 0 18 18" sw={1.5} className={className}>
    <path d="M10.998 3.82599C12.8602 4.45429 14.3295 5.93581 14.9409 7.80551" />
    <path d="M2.87101 10.981C2.48391 9.05459 3.0321 7.041 4.3456 5.5766" />
    <path d="M13.131 14.443C11.655 15.743 9.63592 16.2743 7.70972 15.8675" />
    <circle cx="9" cy="3.75" r="2" />
    <circle cx="3.804" cy="12.75" r="2" />
    <circle cx="14.196" cy="12.75" r="2" />
  </Outline>
)

export const IconCoin = ({ className }: P) => (
  <Outline vb="0 0 18 18" sw={1.5} className={className}>
    <circle cx="4.25" cy="7" r="0.75" fill="currentColor" stroke="none" />
    <path d="M7.6936 8.69839C7.127 8.34519 6.75 7.7169 6.75 7C6.75 5.895 7.645 5 8.75 5C8.9454 5 9.1343 5.02791 9.3129 5.08011" />
    <path d="M6.75 12.25H3.75C2.645 12.25 1.75 11.355 1.75 10.25V3.75C1.75 2.645 2.645 1.75 3.75 1.75H14.25C15.355 1.75 16.25 2.645 16.25 3.75V4.25" />
    <rect x="9.75" y="10.25" width="6.5" height="3" rx="1" />
    <rect x="10.75" y="7.25" width="6.5" height="3" rx="1" />
  </Outline>
)

export const IconHammer = ({ className }: P) => (
  <Outline vb="0 0 20 20" sw={2} className={className}>
    <path d="m13.57,9.258l-6.656,6.656c-.781.781-2.047.781-2.828,0h0c-.781-.781-.781-2.047,0-2.828l6.656-6.656" />
    <path
      d="m15.831,10.602l1.432-1.432c.316-.316.316-.829,0-1.146l-4.01-4.379-4.931-.343-.286.286,6.65,7.013c.316.316.829.316,1.146,0Z"
      fill="currentColor"
    />
  </Outline>
)

export const IconCubes = ({ className }: P) => (
  <Outline vb="0 0 24 24" sw={2} className={className}>
    <path d="M7 8V14" />
    <path d="M17 8V14" />
    <path d="M12 17V22.5" />
    <path d="M12 5.6842L7 7.99999L2 5.6842" />
    <path d="M7 14.6842L12 17L17 14.6842" />
    <path d="M12 5.6842L17 7.99999L22 5.6842" />
    <path d="M12 11.6842V5.31579L7 3L2 5.31579V11.6842L7 14L12 11.6842Z" />
    <path d="M22 11.6842V5.31579L17 3L12 5.31579V11.6842L17 14L22 11.6842Z" />
    <path d="M17 20.3684V14L12 11.6842L7 14V20.3684L12 22.6842L17 20.3684Z" />
  </Outline>
)

export const IconTelegram = ({ className }: P) => (
  <Brand className={className}>
    <path d="M16,2c-7.732,0-14,6.268-14,14s6.268,14,14,14,14-6.268,14-14S23.732,2,16,2Zm6.489,9.521c-.211,2.214-1.122,7.586-1.586,10.065-.196,1.049-.583,1.401-.957,1.435-.813,.075-1.43-.537-2.218-1.053-1.232-.808-1.928-1.311-3.124-2.099-1.382-.911-.486-1.412,.302-2.23,.206-.214,3.788-3.472,3.858-3.768,.009-.037,.017-.175-.065-.248-.082-.073-.203-.048-.29-.028-.124,.028-2.092,1.329-5.905,3.903-.559,.384-1.065,.571-1.518,.561-.5-.011-1.461-.283-2.176-.515-.877-.285-1.574-.436-1.513-.92,.032-.252,.379-.51,1.042-.773,4.081-1.778,6.803-2.95,8.164-3.517,3.888-1.617,4.696-1.898,5.222-1.907,.116-.002,.375,.027,.543,.163,.142,.115,.181,.27,.199,.379,.019,.109,.042,.357,.023,.551Z" />
  </Brand>
)

export const IconX = ({ className }: P) => (
  <Brand className={className}>
    <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z" />
  </Brand>
)

export const IconYoutube = ({ className }: P) => (
  <Brand className={className}>
    <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z" />
  </Brand>
)

export const IconGithub = ({ className }: P) => (
  <Brand className={className}>
    <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z" />
  </Brand>
)
