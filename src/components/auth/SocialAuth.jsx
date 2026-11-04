function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.6 12.23c0-.72-.06-1.42-.18-2.1H12v3.98h5.38a4.6 4.6 0 0 1-2 3.02v2.58h3.25c1.9-1.75 2.97-4.33 2.97-7.48Z"
        fill="#14213D"
      />
      <path
        d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.25-2.58c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.6-4.1H3.04v2.62A10 10 0 0 0 12 22Z"
        fill="#14213D"
      />
      <path
        d="M6.4 13.85a6.02 6.02 0 0 1 0-3.7V7.53H3.04a10 10 0 0 0 0 8.94l3.36-2.62Z"
        fill="#14213D"
      />
      <path
        d="M12 6.05c1.47 0 2.8.5 3.84 1.52l2.88-2.88C16.97 3.05 14.7 2 12 2a10 10 0 0 0-8.96 5.53L6.4 10.15c.8-2.35 3-4.1 5.6-4.1Z"
        fill="#14213D"
      />
    </svg>
  )
}

function SocialAuth({ notice, onContinue }) {
  return (
    <>
      <div className="my-2 flex items-center gap-3 lg:my-4">
        <div className="w-full border-t border-alpha-border" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-alpha-navy/50">
          OR
        </span>
        <div className="w-full border-t border-alpha-border" />
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="flex min-h-[46px] w-full items-center justify-center gap-3 rounded-lg border border-alpha-border px-4 py-3 text-sm font-semibold text-alpha-navy shadow-sm transition-colors hover:bg-alpha-border/30 active:scale-[0.99] active:bg-alpha-border/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha-orange motion-reduce:transition-none"
      >
        <GoogleMark />
        Continue with Google
      </button>
      {notice && (
        <p role="status" className="mt-3 text-center text-xs text-alpha-navy/70">
          {notice}
        </p>
      )}
    </>
  )
}

export default SocialAuth
