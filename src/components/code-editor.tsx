import { useRef } from "react";
import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { IKeyboardEvent } from "monaco-editor";

//TODO Add format on save
//TODO Disable on save document

interface codeEditorProps {
  initialValue: string;
  onChangeCodeInput(value: string | undefined): void;
}

const CodeEditor: React.FC<codeEditorProps> = ({
  initialValue,
  onChangeCodeInput,
}) => {
  const codeEditor = useRef<any>();

  const onChange: OnChange = (value) => {
    onChangeCodeInput(value);
  };

  const onMount: OnMount = (monacoEditor) => {
    codeEditor.current = monacoEditor;

    let handleOnKeyDown = codeEditor.current.onKeyDown(
      (event: IKeyboardEvent) => {
        if (event.metaKey && event.code === "KeyB") {
          formatOnSave();
          console.log(event.metaKey, event.code);
        }
      }
    );

    //clearning up
    return () => handleOnKeyDown.dispose();
  };

  function formatOnSave() {
    const unformattedCode = codeEditor.current.getModel().getValue();
    const formattedCode = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
    });
    codeEditor.current.setValue(formattedCode);
  }

  return (
    <>
      <MonacoEditor
        value={initialValue}
        onChange={onChange}
        onMount={onMount}
        language="javascript"
        theme="vs-dark"
        height="100vh"
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: true, // to reset
          fontSize: 13,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </>
  );
};

export default CodeEditor;
