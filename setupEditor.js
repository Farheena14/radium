import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { defaultTabBinding } from "@codemirror/commands"
import { EditorView, Keymap } from "@codemirror/view"
import { json } from "@codemirror/lang-json"
export default function setupEditors() {
    const jsonrequestBody = document.querySelector("[data-json-request-body]")
    const jsonResponseBody = document.querySelector("[data-json-response-body]")

    const basicExtensions = [ //both editor same 
        basicSetup,
        Keymap.of([defaultTabBinding]), //helps us to use tab inside texteditor
        json(), //lang-format json
        EditorState.tabSize.of(2), //tab spacing as 2spaces
    ]

    const requestEditor = new EditorView({
        state: EditorState.create({
            doc: "{\n\t\n}", //newline tab newline 
            extensions: basicExtensions,
        }),
        parent: jsonrequestBody,
    })

    const responseEditor = new EditorView({
        state: EditorState.create({
            doc: "{}", //empty Obj
            extensions: [...basicExtensions, EditorView.editable.of(false)], //Returned value and it will be read only extension
        }),
        parent: jsonResponseBody
    })

    function updateResponseEditor(value) { //update the content inside Editor, update response editor 
        responseEditor.dispatch({
            changes: {
                from: 0,
                to: responseEditor.state.doc.length, //dispatch all the changes make inside changes of object from index zero to "insert" JSON.
                insert: JSON.stringify(value, null, 2),
            },
        })
    }
    return { requestEditor, updateResponseEditor }
}