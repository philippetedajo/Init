import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import EditorHeader from "../components/EditorHeader";
import EditorFooter from "../components/EditorFooter";
import Editor from "../components/Editor";
import "./styles/playground.css";
import "./styles/editor-syntax.css";

export const Playground = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <div className="bg-editorsecondary">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Playground</title>
      </Helmet>
      <div className="editor-container">
        <EditorHeader template={location.state} />
        <Editor template={location.state} />
        <EditorFooter />
      </div>
    </div>
  );
};
