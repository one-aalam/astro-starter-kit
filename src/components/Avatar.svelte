<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { fade, fly } from 'svelte/transition';
    import { spring } from "svelte/motion";
    import { toTitleCase } from '../utils'

    const dicebearBaseUrl = 'https://avatars.dicebear.com/api/'
    const avatarTypes = ['bottts', 'avataaars']

    export let name;
    export let avatarType: keyof typeof avatarTypes;

    const dispatch = createEventDispatcher();

    const fadeSpring = spring(1, { stiffness: 0.1, damping: 0.5 });
    const transformSpring = spring(0, { stiffness: 0.2, damping: 0.1 });

    const toggleFade = () => fadeSpring.update(val => (val ? 0 : 1));
    const toggleTransform = () => transformSpring.update(val => (val ? 0 : 500));

    let likes = 0;

    function like() {
        likes += 1;
        toggleTransform()
        dispatch('like', {for: name, likes: likes });
    }

    // Since we're not using Typescript yet, we'll have to rely on runtime checks to prevent errors originating from the passed values
    const getAvatarUrl = (avatarType, name) => `${dicebearBaseUrl}${avatarTypes.indexOf(avatarType) === -1 ? avatarTypes[0] : avatarType}/${name}.svg`
    </script>
    <div class="relative">
        <div style="transform: translateX({$transformSpring}px)">
            <img width="160" src={getAvatarUrl(avatarType, name)} on:click={like} alt={toTitleCase(name)} title={toTitleCase(name)} />
            {#if likes && !$transformSpring}
                <h5 class="likes" on:click={toggleFade} style="opacity: {$fadeSpring}"  in:fly="{{ y: 200, duration: 500 }}" out:fade>{likes/2}</h5>
            {/if}
        </div>
            {#if likes && $transformSpring}
                <button on:click={like}>brink {toTitleCase(name)} back!</button>
            {/if}
    </div>

    <style lang="scss">
        /* SCSS equivalent of TailwindCSS -> block w-12 h-12 bg-blue-700 text-white rounded-full absolute top-0 right-0 */
        /* due to prose classes applied tailwindCSS styles won't work*/
        .likes {
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.5rem;
            height: 2.5rem;
            background-color: rgba(29, 78, 216, var(--tw-bg-opacity));
            color: rgba(255, 255, 255, var(--tw-text-opacity));
            border-radius: 9999px;
            position: absolute;
            top: 0px;
            right: 0px
        }
        /* SCSS equivalent of TailwindCSS -> block w-12 h-12 bg-blue-700 text-white rounded-full absolute top-0 right-0 */
        button {
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            background-color: rgba(76, 29, 149, var(--tw-bg-opacity));
            color: rgba(255, 255, 255, var(--tw-text-opacity));
            padding-left: 0.5rem/* 8px */;
            padding-right: 0.5rem/* 8px */;
            border-radius: 0.375rem/* 2px */;
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
    </style>
