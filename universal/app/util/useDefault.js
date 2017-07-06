export default function useDefault(p) {
    return p.then(e => e.default);
}
