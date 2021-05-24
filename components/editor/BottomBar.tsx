import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { editor_state, toggle_console } from "../../store/features/editorSlice";

const BottomBar: React.FC = () => {
  const {
    codeEditor: { js },
    hasConsoleLogs,
  } = useAppSelector(editor_state);

  const dispatch = useAppDispatch();

  const handleToggleConsole = () => {
    dispatch(toggle_console());
  };

  return (
    <footer
      className={`flex flex-shrink-0 h-6 justify-between bg-tree-soft text-white item-center font-semibold px-5 text-sm z-50`}
    >
      <div className="flex">
        {js.code.loading ? <div className="mr-3">Transpiling...</div> : ""}
        {/*<a*/}
        {/*  className="mr-2 hover:text-green-500 h-full flex items-center"*/}
        {/*  href="https://twitter.com/PhilippeTedajo"*/}
        {/*  target="_blank"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  Twitter*/}
        {/*</a>*/}
        {/*<a*/}
        {/*  className="mr-2 hover:text-green-500 h-full flex items-center "*/}
        {/*  href="https://discord.gg/sV3UHkab43"*/}
        {/*  target="_blank"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  Join Discord*/}
        {/*</a>*/}
      </div>

      <div className="flex justify-center items-center">
        <span className="cursor-pointer mr-4" onClick={handleToggleConsole}>
          Console
        </span>

        {hasConsoleLogs ? (
          <>
            <div className="absolute right-5 p-1 bg-green-400 rounded-full animate-ping" />
            <div className="absolute right-5 p-1 bg-green-400  border-white rounded-full" />
          </>
        ) : (
          ""
        )}
      </div>
    </footer>
  );
};

export default BottomBar;
