

export default function IconButton({icon,onPress}) {
  return (
    <div
    onClick={onPress}
    className="icon_wrapper w-[40px] h-[40px] flex justify-center items-center bg-slate-300 rounded-md cursor-pointer">
    {icon}
</div>
  )
}
