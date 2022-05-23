import React from 'react'

const CardResume = () => {
  return (
    <div className="Main_C_Resume  w-full h-30">
      <div className="Main_Photo_Resu w-20  h-30">
        <img src="/images/Resume.png" className="sec-img"></img>
      </div>
      <div className="Main_Info_Resu p-4  h-30">
        <div className="Container_PR   font-bold h-1/4 font-helvetica text-center divide-y divide-slate-200"> Afro alocado</div>
        <div className="Container_TP    text-left h-1/4  divide-y divide-slate-200">Nombre</div>
        <div className="Container_PR  font-helvetica h-1/4  text-left divide-y divide-slate-200"> Servicio #1</div>
        <div className="Container_TP    text-left h-1/4 divide-y divide-slate-200">Precio </div>
      </div>
      <div className="Main_Icons_Resu justify-center p-4 h-30">
        <div className="Main_I_Heart w-20 justify-center h-1/3">
          <img src="/images/Heart.png" className="sec-img"></img>
        </div>
        <div className="Main_I_Pencil w-20  content-center h-1/3">
          <img src="/images/Pencil.png" className="sec-img"></img>
        </div>
        <div className="Main_I_Gar w-20 content-center h-1/3">
          <img src="/images/Garbage.png" className="sec-img"></img>
        </div>
      </div>
    </div>
  )
}

export default CardResume
