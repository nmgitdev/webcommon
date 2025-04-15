let isDarkMode = false;
let currentZoom = 1;
const zoomFactor = 1.2;
const mermaidDiv = document.querySelector('.mermaid');

function initializeMermaid(theme) {
    mermaid.initialize({
        startOnLoad: true,
        theme: theme,
        logLevel: 'fatal',
        securityLevel: 'strict',
        flowchart: { curve: 'basis' }
    });
    mermaid.init(undefined, mermaidDiv);
}

function setZoom(zoom) {
    currentZoom = zoom;
    mermaidDiv.style.transform = `scale(${currentZoom})`;
}

function zoomIn() {
    setZoom(currentZoom * zoomFactor);
}

function zoomOut() {
    setZoom(currentZoom / zoomFactor);
}

function resetZoom() {
    setZoom(1);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    initializeMermaid(isDarkMode ? 'dark' : 'default');
}

function exportImage() {
    const fileName = prompt("The image will be exported as PNG and scaled to current zoom. Save as (without extension):", "mermaid_diagram");
    if (fileName) {
        html2canvas(document.querySelector(".mermaid")).then(canvas => {
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}

document.getElementById('diagram-container').addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }
});

// Initialize Mermaid when the page loads
window.addEventListener('load', () => initializeMermaid('default'));