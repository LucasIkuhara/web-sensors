<section class="video-box">
    <p>Camera Demo</p>
    <img id="video-display" alt="video playback frame">
</section>

<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { VideoImageService } from '../../adapters/extractors/VideoExtractor';

    const videoService = new VideoImageService("user", 30, 720, 480);

    onMount(async () => {

        const player: HTMLImageElement = document.getElementById("video-display") as HTMLImageElement;
        console.log(player)
        if (!player)
            throw Error("Missing video player.");

        videoService.registerCallback(async (data) => {
                player.src = data;
        });
    });
	onDestroy(() => {
		videoService.destroy();
	})
</script>

<style>
    #video-display {
        width: 95%;
    }
</style>