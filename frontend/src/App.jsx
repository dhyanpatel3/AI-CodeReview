import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [code, setCode] = useState(`function sum(){
  return a + b;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error fetching review.");
    }
    setLoading(false);
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            onClick={!loading ? reviewCode : undefined}
            className={`review${loading ? " loading" : ""}`}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? <span className="loader"></span> : "Review"}
          </div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loader-container">
              <span className="loader"></span>
              <div>Loading review...</div>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
