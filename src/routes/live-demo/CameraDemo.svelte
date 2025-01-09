<section class="video-box">
    <p>Camera Demo</p>
    <video id="video-display"></video>
</section>

<script lang="js">
    import { onDestroy } from 'svelte';
    import { VideoService } from '../../adapters/VideoExtractor';

    const videoService = new VideoService(true)
    videoService.registerCallback(async (media) => {

        const video = document.getElementsByTagName("video").item(0);
        if (!video)
            throw new Error("where is ma video")
    
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');

        video.srcObject = media
        console.log(media.getVideoTracks()[0].applyConstraints())
    });

	onDestroy(() => {
		videoService.destroy();
	})
</script>

<style>
    #video-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #video-display {
        width: 95%;
    }
</style>