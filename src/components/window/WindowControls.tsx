export default interface WindowControls {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    isMaximized: () => boolean
}
