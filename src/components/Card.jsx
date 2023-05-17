import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UserImage = ({user}) => {
  return (
    <img 
      src={`https://loremflickr.com/320/320/headshot/?random=${Math.random() * 100}`} alt={user} 
      className="w-[50px] h-[50px] rounded-full "
      />
  )
}

export const PostCard = () => {

  return(
    <a className="flex pl-6 pr-8 py-3 h-[110px] sm:h-[140px] bg-card " href="#side">
      <UserImage user="Dave"/>
      <div className="ml-2 flow-root ">
        <div className="">
          <p>Dave
            <span className="text-[14px] text-[#6C757D] ml-2">
              @davelin &#8729; 3小時前
            </span>
          </p>
          <h4 className="font-bold text-lg">What is Lorem Ipsum?</h4>
          <p className="leading-[26px] text-md line-clamp-1 sm:line-clamp-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className="absolute right-2 top-2">
          <FontAwesomeIcon icon="fa-regular fa-bookmark" />
          {/* <FontAwesomeIcon icon="fa-solid fa-bookmark" /> */}
        </div>
      </div>
    </a>
  )
}

export const PostSide = () => {
  return(
    <>
      <div className="flex pl-6 pr-8 py-2">
        <UserImage user="Dave" />
        <div className="ml-2 flow-root ">
          <p>Dave</p>
          <p className="text-[#6C757D] slashed-zero">
            2023/05/15 18:18 &#9786;
          </p>
        </div>
      </div>
      <div className="px-6 pb-4">
        <h3 className="font-bold text-xl ">What is Lorem Ipsum?</h3>
        <img 
          src={`https://loremflickr.com/320/320/headshot/?random=${Math.random() * 100}`} 
          alt="post" 
          className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-contain my-3 mx-auto"/>
        <p className="antialiased font-sans">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </>
  )
}

export const TargetCard = ({target}) => {
  return(
      <div className="flex items-center border-2 rounded-full pl-2 text-rose-900" >
        <FontAwesomeIcon icon="fa-solid fa-bullseye" />
        <p className="px-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{target}</p>
      </div>    
  )
}

export const ReportCard = () => {
  return (
    <a className={`flex pl-6 pr-8 py-3 h-[160px] sm:h-[190px] bg-card `} href="#side">
      <div className="ml-2 flow-root ">
        <h2 className="font-bold text-lg">What is Lorem Ipsum?</h2>
        <div className="flex space-x-16 pt-2 sm:space-x-28">
          <ul className="pl-4 font-normal list-disc text-sm text-[#6C757D]">
            <li>上傳者： Dave</li>
            <li>上傳日期： 2023/05/16</li>
            <li>出版日期： 2023/05/16</li>
            <li>出版作者： 兆豐投顧</li>
          </ul>
          <div className="h-[100px] flex flex-col flex-wrap">
            <TargetCard target="半導體" />
            <TargetCard target="台積電"/>
            <TargetCard target="台積電"/>
            <TargetCard target="台積電"/>
          </div>
        </div>
      </div>
    </a>
  )
}

export const ReportSide = () => {
  return (
    <div className="px-6 py-4">
      <h2 className="mb-4 font-bold text-xl ">What is Lorem Ipsum?</h2>
      <div className=" flex flex-wrap py-2">
        <TargetCard target="半導體" />
        <TargetCard target="台積電"/>
        <TargetCard target="台積電"/>
      </div>
      <div className="mt-4">
        <p className="antialiased font-sans leading-6 text-[#333333]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </div>
  )
}