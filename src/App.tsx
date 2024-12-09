import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Operation, type Mutation, type Insight, type InsightRow } from "./types";

const App: React.FC = () => {
  const [insights, setInsights] = useState<ReadonlyArray<Insight>>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event: MessageEvent<string>) => {
      const mutation = JSON.parse(event.data) as Mutation;
      /**
       * TODO Implementation below
       */
      switch (mutation.type) {
        case Operation.Reset: {
          setInsights(mutation.payload);
          break;
        }
        case Operation.AddRows: {
          break;
        }

        case Operation.DelRows: {
          break;
        }

        case Operation.SortRows: {
          break;
        }

        case Operation.AddInsights: {
          break;
        }

        case Operation.DelInsights: {
          break;
        }
        case Operation.SortInsights: {
          break;
        }
      }
    }

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="dashboard">
      {insights.map((insight) => (
        <div key={insight.title} className="insight">
          <h2>{insight.title}</h2>
          <div className="insight-table">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {insight.rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);