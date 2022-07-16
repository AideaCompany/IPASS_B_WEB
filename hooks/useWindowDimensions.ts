import { useState, useEffect } from 'react'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  var getContainer = '1200px'
  if (width >= 1200) {
    getContainer = '1200px'
  } else if (width >= 992) {
    getContainer = '992px'
  } else if (width >= 768) {
    getContainer = '768px'
  } else if (width >= 576) {
    getContainer = '576px'
  } else {
    getContainer = `${width}px`
  }

  return {
    width,
    height,
    getContainer
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
