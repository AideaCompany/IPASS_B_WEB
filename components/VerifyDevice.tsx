import React, { useEffect, useState } from 'react'

import { Modal } from 'antd'
import { isMobile, isIOS } from 'react-device-detect'

const VerifyDevice = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (isMobile) {
      const url = 'intent://instagram.com/home#Intent;scheme=com.instagram.android;package=com.instagram.android;end'

      window.location.replace(url)
      setIsModalVisible(true)
    } else if (isIOS) {
      window.location.replace('instagram://')

      setTimeout(() => {
        window.location.replace('https://apps.apple.com/us/app/instagram/id389801252')
      }, 10000)
    }
  }, [])

  return (
    <>
      <Modal title="Notificación" visible={isModalVisible}>
        <div className="App">
          <div>Para mejorar tu experiencia descarga o ingresa a nuestra App</div>
          {isMobile ? (
            <a className="border justify-center " href="intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end' ">
              <div
                className="container_logo h-auto pl-20
               w-60"
              >
                <svg className="mt-4" width="15em" height="5em" viewBox="0 0 125 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_198_705)">
                    <path
                      d="M44.5957 23.4806L37.8559 6.84851L40.029 0.915237H40.5014C46.4538 14.7701 52.4692 29.6664 52.4692 29.6664C54.0754 33.422 55.0517 33.3904 56.3745 33.4536V34.0848L45.6035 34.211V33.5798C48.1545 33.5482 47.6506 30.8656 46.4853 28.2146L44.8476 24.1118L44.5957 23.4806ZM31.8091 26.7313C30.8642 30.1713 30.6753 33.8638 35.9033 33.6429V34.2741L25.3528 34.3688V33.7376C26.9275 33.6745 27.9983 33.4851 30.8642 26.1948L31.8091 26.7313Z"
                      fill="black"
                    />
                    <path
                      d="M66.1376 0.59964L87.4591 27.5519L87.522 33.706L86.0103 33.7376L63.0826 4.79712C60.0277 1.04148 58.642 1.38864 57.4137 1.29396V0.66276L66.1376 0.59964ZM65.8856 24.8377C66.1061 28.8142 67.1454 33.3273 72.1214 33.2642V33.8954L58.453 34.0532V33.422C63.9645 33.3589 64.9723 28.8458 65.1297 24.8377H65.8856Z"
                      fill="black"
                    />
                    <path
                      d="M124.937 0L125.031 8.33183H124.402C124.118 0.725879 116.245 0.694319 115.583 0.694319L112.78 0.725879L113.064 28.8458C113.095 31.9702 114.575 32.8224 116.56 32.7908V33.422L105.033 33.5482V32.917C107.017 32.8855 108.434 32.0334 108.403 28.9089L108.119 0.788999L105.316 0.820559C103.836 0.820559 96.8128 1.00992 96.6868 8.61587H96.0884L96.0255 0.3156L124.937 0Z"
                      fill="black"
                    />
                    <path
                      d="M33.1003 1.70424V2.30388C30.0139 2.33544 28.8171 2.33544 24.6599 13.6339L16.8178 34.9684H16.1565C10.2356 21.2083 4.50365 6.02795 4.50365 6.02795C3.11791 2.74572 1.6062 2.65104 0 2.6826V2.08296L12.6291 1.95672V2.55636C8.72386 2.58792 9.76316 6.43823 9.85765 6.75383L18.4555 29.0983L24.1245 13.5708C25.5417 9.18395 28.2187 2.367 21.479 2.46168V1.86204L33.1003 1.70424Z"
                      fill="black"
                    />
                    <path
                      d="M86.8922 9.468C86.6402 5.49144 85.5694 0.978366 80.058 1.04149V0.410287L93.7264 0.252487V0.883686C88.7504 0.946806 87.837 5.45988 87.6795 9.43644L86.8922 9.468Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_198_705">
                      <rect width="125" height="35" fill="black" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="font-Gothic text-black mt-0 text-right text-lg">BEAUTY SALON</p>
              </div>
            </a>
          ) : isIOS ? (
            <a href="https://apps.apple.com/us/app/instagram/id389801252">Open iOS app</a>
          ) : (
            <a href="https://instagram.com">Open Web app</a>
          )}
        </div>
      </Modal>
    </>
  )
}

export default React.memo(VerifyDevice)
