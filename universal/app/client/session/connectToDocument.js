import { state as documentState } from "../../components/document/document";

export default function connectToDocument(store) {
    store.watch(documentState.select, newDocumentState => {
        document.title = newDocumentState.title;
    });
}
