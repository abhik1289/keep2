;

export default function PenBox({ colors, setPencilColor,setSelectedColor,selectedColor }) {
  const handleChooseColor = (index, id) => {
    setSelectedColor(id);
    setPencilColor(colors[index]?.color)
  }
  return (
    <div className='absolute bg-white p-2 rounded-md  flex gap-2 w-[250px] flex-wrap shadow-lg'
    >
      {
        colors.map((item, i) => <div className={`colorBox w-[25px] h-[25px] rounded-full cursor-pointer relative border-2 transition-all ${selectedColor === item.id && "border-violet-600"} `}
          onClick={() => handleChooseColor(i, item.id)}
          style={{
            background: item.color,
          
          }}>
         
        </div>)
      }
    </div>
  )
}
