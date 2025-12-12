<section class="video-box">
    Camera Demo
    <img id="video-display" alt="video playback frame">
</section>

<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { VideoImageService } from '../../adapters/extractors/VideoExtractor';

    const videoService = new VideoImageService("user", 30);

    onMount(async () => {

        const player: HTMLImageElement = document.getElementById("video-display") as HTMLImageElement;
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
        width: 100%;
        aspect-ratio: 16 / 9;
        padding-top: 1rem;
    }
</style>