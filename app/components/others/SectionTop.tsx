
const SectionTop = ({title,desc}:{title:string,desc:string}) => {
  return (
    <div>
      <div className='xl:w-[50%]  mx-auto pb-6'>
     <div className='text-center'>
     <h1 className={` lg:text-4xl text-3xl font-bold pb-2 capitalize`}>{title || "undefine title"} </h1>
     <p className='text-gray-400 capitalize'>{desc || "undefine description"}</p>
     </div>
      </div>
    </div>
  );
}

export default SectionTop;
