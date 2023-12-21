import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player/lazy';

//Icons
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { BsFilePlayFill } from "react-icons/bs";

const SharesVideo = dynamic(() => import('./SharesVideo')) // SharesModal added as dynamic

const Shares = () => {
    const [openSharesWideScreen, setOpenSharesWideScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    //currently playing video in <SharesVideos/> compoment
    const [currentVideo, setCurrentVideo] = useState({
        index: 0,
        name: 'video1.mp4',
    });

    const videoRef = useRef(null);

    //video play-pause function
    const handlePlayButtonClick = () => {
        setIsPlaying(true);
    };

    //All videos
    const videoList = [
        { name: 'video1.mp4', caption: 'Video 1', desc: "Bugün çok özel bir video hazırladım sizler için umarım seversiniz." },
        { name: 'video2.mp4', caption: 'Video 2', desc: "Bugün çok özel bir video hazırladım sizler için umarım seversiniz." },
        { name: 'video1.mp4', caption: 'Video 1', desc: "Bugün çok özel bir video hazırladım sizler için umarım seversiniz." },
        { name: 'video2.mp4', caption: 'Video 2', desc: "Bugün çok özel bir video hazırladım sizler için umarım seversiniz." }
    ];

    //Close video modal ( <SharesVideos/> component)
    const openModal = (currentVideo) => {
        setOpenSharesWideScreen(true);
        setCurrentVideo(currentVideo)
        //Play video
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    //Open video modal ( <SharesVideos/> component)
    const closeModal = () => {
        setOpenSharesWideScreen(false);
        // Pause video
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }

    return (
        <div className='grid grid-cols-2 miniTablet:grid-cols-3 gap-5 '>
            {
                videoList && videoList.map((video, i) => (
                    <div key={i} onClick={() => openModal(video)} className='video-container cursor-pointer relative bg-secondaryGray'>
                        <BsFilePlayFill  size={30} onClick={() => window.alert("ssf")} className='cursor-pointer absolute top-2 left-1' color='white' />
                        <ReactPlayer
                            loop={false}
                            playsInline
                            light={false}
                            controls={false}
                            url={[video.name]}
                            width='100%'
                            height='100%'
                            playing={true}
                            muted={true}
                        />
                    </div>
                ))
            }


            {openSharesWideScreen && <SharesVideo currentVideo={currentVideo} closeModal={closeModal} />}
        </div>





    )
}

export default Shares