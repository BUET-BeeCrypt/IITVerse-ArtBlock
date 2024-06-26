import React from 'react'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);
  if (!mounted) return null


  return (
    <button
      className="group relative rounded-full p-1 text-slate-500 hover:bg-blue-800 dark:hover:bg-blue-200"
      onClick={e => {
        e.preventDefault()
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {resolvedTheme === 'light' ? (
        <MoonIcon className="inline-block h-6 w-6 group-hover:text-yellow-500" />
      ) : (
        <SunIcon className="inline-block h-6 w-6 group-hover:text-red-400" />
      )}
    </button>
  )
}
