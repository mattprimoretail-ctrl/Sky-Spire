# Sky Spire

A 3D climbing platformer. Guide a caped fox up a giant spiral to the golden star. Fall too far and you start over.

Three fall modes (Ruthless, Forgiving, Checkpoints), three cameras, a speedrun timer with splits, personal bests and a ghost of your best run, and a different world and soundtrack in every zone.

## Put it on GitHub and install it on your phone

1. Create a new repository on GitHub (public is simplest, for example `sky-spire`).
2. Upload everything in this folder to the repository root: `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll` and the `icons` folder.
3. In the repository go to **Settings, Pages**. Under **Build and deployment** choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, and save.
4. After a minute your game is live at `https://YOUR-USERNAME.github.io/sky-spire/`.
5. Open that address on your phone:
   - **iPhone or iPad (Safari):** tap Share, then **Add to Home Screen**.
   - **Android (Chrome):** tap **Install app** on the title screen, or the browser menu, then **Install app** or **Add to Home screen**.

The game then opens full screen from its own icon. After the first load it also works offline.

## Notes

- Everything saves on the device: your settings, best height, best times and ghost runs.
- The game loads three.js (r128) from cdnjs on first visit, and the service worker keeps a copy for offline play.
- To ship an update, replace the files and bump `CACHE` in `sw.js` (for example `sky-spire-v2`) so phones pick up the new version.
- Everything is a single `index.html`. There is no build step.
