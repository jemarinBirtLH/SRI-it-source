(function () {
    var audioCtx = null;
    var masterGain = null;
    var unlocked = false;

    function ensureAudioContext() {
        if (!audioCtx) {
            var Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return null;
            audioCtx = new Ctx();
            masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.16;
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function unlockAudio() {
        var ctx = ensureAudioContext();
        if (!ctx) return;
        if (!unlocked) {
            unlocked = true;
        }
    }

    function beep(freq, duration, type, volume, startTime, endFreq) {
        var ctx = ensureAudioContext();
        if (!ctx || !masterGain) return;

        var now = startTime || ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freq, now);
        if (typeof endFreq === 'number') {
            osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), now + duration);
        }

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume || 0.18), now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.02);
    }

    function playMelody(notes, type, volume, step) {
        var ctx = ensureAudioContext();
        if (!ctx) return;
        var t = ctx.currentTime;
        var noteStep = step || 0.075;
        notes.forEach(function (n, i) {
            beep(n, noteStep * 0.95, type || 'square', volume || 0.14, t + i * noteStep);
        });
    }

    function playSfx(kind) {
        ensureAudioContext();
        if (!audioCtx) return;

        switch (kind) {
            case 'nav':
                playMelody([659, 784, 988], 'square', 0.14, 0.06);
                break;
            case 'theme':
                playMelody([523, 659, 784, 1047], 'square', 0.16, 0.065);
                break;
            case 'button':
                playMelody([880, 1175], 'square', 0.13, 0.055);
                break;
            case 'accordion':
                playMelody([523, 659], 'triangle', 0.11, 0.06);
                break;
            case 'input':
                beep(740, 0.045, 'triangle', 0.08, undefined, 820);
                break;
            case 'error':
                beep(260, 0.09, 'sawtooth', 0.12, undefined, 180);
                break;
            default:
                playMelody([660, 880], 'square', 0.11, 0.055);
                break;
        }
    }

    document.addEventListener('pointerdown', unlockAudio, { passive: true });
    document.addEventListener('keydown', unlockAudio, { passive: true });

    document.addEventListener('click', function (event) {
        var target = event.target;

        var themeBtn = target.closest('#themeToggle');
        if (themeBtn) {
            playSfx('theme');
            return;
        }

        var navLink = target.closest('.nav-link-neon');
        if (navLink) {
            playSfx('nav');
            return;
        }

        var accordionBtn = target.closest('.accordion-header, .accordion-button');
        if (accordionBtn) {
            playSfx('accordion');
            return;
        }

        var button = target.closest('button, .btn');
        if (button) {
            if (button.classList.contains('btn-danger')) {
                playSfx('error');
            } else {
                playSfx('button');
            }
            return;
        }
    });

    document.addEventListener('focusin', function (event) {
        var el = event.target;
        if (el && el.matches('input, select, textarea')) {
            playSfx('input');
        }
    });

    window.siteSfx = {
        play: playSfx,
        unlock: unlockAudio
    };
})();
