import React, { useState } from 'react'

const PhotoPicker = () => {
  const [photo, setPhoto] = useState<File>()
  const [urlToImg, setUrlToImg] = useState('')
  function readURL(input: File) {
    if (input) {
      var reader = new FileReader()

      reader.onload = function (e) {
        setUrlToImg(e?.target?.result as string)
      }

      reader.readAsDataURL(input)
    }
  }
  const handleFile = (ev: React.DragEvent<HTMLDivElement>) => {
    const files = []
    if (ev.dataTransfer.items) {
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile()
          files.push(file)
        }
      }
    }
    setPhoto(files[0] as File)
    readURL(files[0] as File)
  }

  return (
    <div
      onDragOver={ev => ev.preventDefault()}
      onDrop={ev => {
        ev.preventDefault()
        handleFile(ev)
      }}
      className="flex justify-center w-full h-full"
    >
      <div className="rounded-lg w-full shadow-md bg-gray-50">
        {photo && urlToImg !== '' ? (
          <div className="flex justify-center w-full h-full">
            <img style={{ objectFit: 'cover', width: '100%' }} src={urlToImg}></img>
          </div>
        ) : (
          <div className="m-4 h-full ">
            <div className="flex items-center justify-center align-center w-full">
              <label
                style={{ height: '80%' }}
                className="cursor-pointer flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
              >
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Selecciona o arrastra una foto</p>
                </div>
                <input
                  onChange={ev => {
                    console.log(ev.target.files?.item(0))
                    if (ev.target.files?.item(0)) {
                      readURL(ev.target.files?.item(0) as File)
                      setPhoto(ev.target.files?.item(0) as File)
                    }
                  }}
                  accept="image/*"
                  type="file"
                  className="opacity-0"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
    // <div>
    //   <img src="/images/map.png" classNameName="map-img"></img>
    // </div>
  )
}

export default PhotoPicker
