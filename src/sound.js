export default class Sound {
    constructor() {
        this.context = this.getAudioContext();
        this.buffers = this.getBuffers();

        this.win = 3;
        this.lose = 1;
        this.bounce = 0;
        this.out = 2;
    }

    play(bufferId) {
        if (this.context.state === 'suspended') { this.context.resume(); }
        const source = this.context.createBufferSource();
        source.buffer = this.buffers[bufferId];
        source.connect(this.context.destination);
        source.start();


    }

    getBuffers() {
        let buffers = [];
        let elements = document.querySelectorAll('audio');
        for (let i = 0; i < elements.length; i++) {
            fetch(elements[i].src)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => this.context.decodeAudioData(arrayBuffer))
                .then((audiobuffer) => {
                    this.buffers[i] = audiobuffer;
                })
        }
        return buffers;
    }

    getAudioContext() {
        let context = this.context;
        if (context === undefined) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext();
        }
        return context;
    }
}