// import React, { useState, useRef, useEffect } from "react";
// import ReactMde from "react-mde";
// import ReactMarkdown from "react-markdown";
// import html2pdf from "html2pdf.js";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-mde/lib/styles/css/react-mde-all.css";
// import { useForm, Controller } from "react-hook-form";

// const ReportBuilder = () => {
//   const pdfRef = useRef();
//   const { control } = useForm();
//   const [selectedTab, setSelectedTab] = useState("write");
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [reports, setReports] = useState([]);
//   const [selectedReportIndex, setSelectedReportIndex] = useState(0);

//   // Fetching the report data from API
//   useEffect(() => {
//     const fetchReportData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://127.0.0.1:8000/getreportdata");
//         if (!response.ok) {
//           throw new Error("Failed to fetch report data");
//         }
//         const data = await response.json();
//         if (Array.isArray(data) && data.length > 0) {
//           setReports(data);
//           generateMarkdown(data[0]); // Generate markdown for the first report by default
//         }
//       } catch (error) {
//         toast.error("❌ Error fetching report data.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchReportData();
//   }, []);

//   const generateMarkdown = (report) => {
//     const markdown = `
// # Site Report: ${report.SiteName}

// **Address:** ${report.SiteAddress}, ${report.City}  
// **Predicted Risk Level:** ${report.PredictedRiskLevel}  
// **Weather Condition:** ${report.WeatherCondition} (Severity: ${report.WeatherSeverity})  
// **Total Anomalies (30 Days):** ${report.TotalAnomalies30Days}  
// **Recent Anomalies (7 Days):** ${report.RecentAnomalies7Days}  

// ## Recommendations
// - ${report.Recommendations?.weather_actions?.join("\n- ") || "None"}

// ## Incident Statistics
// - Resolved: ${report.IncidentStats?.Resolved}
// - Unresolved: ${report.IncidentStats?.Unresolved}
// - In Progress: ${report.IncidentStats?.["In Progress"]}
// `;
//     setValue(markdown);
//   };

//   const handleReportChange = (index) => {
//     setSelectedReportIndex(index);
//     generateMarkdown(reports[index]);
//   };

//   if (loading) {
//     return (
//       <div className="text-center text-gray-500 text-lg py-6">
//         🕒 Loading report data...
//       </div>
//     );
//   }

//   if (!reports.length && !loading) {
//     return (
//       <div className="bg-white rounded shadow p-6 text-center text-gray-500 text-lg">
//         🚫 No report data available.
//       </div>
//     );
//   }

//   const handleDownload = () => {
//     if (!pdfRef.current) return;
//     html2pdf()
//       .set({
//         margin: 0.5,
//         filename: `site-report-${reports[selectedReportIndex].SiteName}.pdf`,
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//       })
//       .from(pdfRef.current)
//       .save()
//       .then(() => {
//         toast.success("📄 PDF downloaded successfully!");
//       })
//       .catch((err) => {
//         toast.error("❌ PDF download failed.");
//         console.error(err);
//       });
//   };

//   return (
//     <div className="bg-white rounded shadow p-6 space-y-4">
//       <h2 className="text-2xl font-bold text-center">📝 Report Editor</h2>

//       {reports.length > 1 && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Report:
//           </label>
//           <select
//             value={selectedReportIndex}
//             onChange={(e) => handleReportChange(Number(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             {reports.map((report, index) => (
//               <option key={index} value={index}>
//                 {report.SiteName} - {report.SiteAddress}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <Controller
//         control={control}
//         name="markdown"
//         render={({ field }) => (
//           <ReactMde
//             value={value}
//             onChange={(newVal) => {
//               setValue(newVal);
//               field.onChange(newVal);
//             }}
//             selectedTab={selectedTab}
//             onTabChange={setSelectedTab}
//             generateMarkdownPreview={(markdown) =>
//               Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
//             }
//           />
//         )}
//       />

//       <div className="text-center">
//         <button
//           onClick={handleDownload}
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           📥 Export as PDF
//         </button>
//       </div>

//       {/* Hidden preview for html2pdf */}
//       <div ref={pdfRef} className="hidden print-preview">
//         <ReactMarkdown>{value}</ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default ReportBuilder;
import React, { useState, useRef, useEffect } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useForm, Controller } from "react-hook-form";

const ReportBuilder = () => {
  const pdfRef = useRef();
  const { control } = useForm();
  const [selectedTab, setSelectedTab] = useState("write");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [useLLM, setUseLLM] = useState(false);
  const [llmReports, setLlmReports] = useState("");
  const [llmAvailable, setLlmAvailable] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        // First fetch regular reports
        const regularResponse = await fetch("http://127.0.0.1:8000/getreportdata");
        if (!regularResponse.ok) {
          throw new Error("Failed to fetch regular report data");
        }
        const regularData = await regularResponse.json();

        // Then try to fetch LLM reports as text
        let llmData = "";
        try {
          const llmResponse = await fetch("http://127.0.0.1:8000/getreportbyLLM", {
            headers: {
              'Accept': 'text/plain', // Expect text response
            }
          });

          if (!llmResponse.ok) {
            throw new Error("LLM API returned error");
          }
          llmData = await llmResponse.text(); // Get response as text
          setLlmAvailable(true);
          setLlmReports(llmData); // Store the complete text response
        } catch (llmError) {
          console.warn("LLM API not available", llmError);
          setLlmAvailable(false);
          toast.warn("LLM reports not available, using default format");
        }

        if (Array.isArray(regularData) && regularData.length > 0) {
          setReports(regularData);
          generateMarkdown(regularData[0], false);
        }
      } catch (error) {
        toast.error("❌ Error fetching report data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const generateMarkdown = (report, useLLMFormat = false) => {
    if (useLLMFormat && llmAvailable) {
      // Use the complete LLM text response as-is
      setValue(llmReports);
    } else {
      // Generate markdown in the default format
      const markdown = `
# Site Report: ${report.SiteName}

**Address:** ${report.SiteAddress}, ${report.City}  
**Predicted Risk Level:** ${report.PredictedRiskLevel}  
**Weather Condition:** ${report.WeatherCondition} (Severity: ${report.WeatherSeverity})  
**Total Anomalies (30 Days):** ${report.TotalAnomalies30Days}  
**Recent Anomalies (7 Days):** ${report.RecentAnomalies7Days}  

## Recommendations
- ${report.Recommendations?.weather_actions?.join("\n- ") || "None"}

## Incident Statistics
- Resolved: ${report.IncidentStats?.Resolved}
- Unresolved: ${report.IncidentStats?.Unresolved}
- In Progress: ${report.IncidentStats?.["In Progress"]}
`;
      setValue(markdown);
    }
  };

  const handleReportChange = (index) => {
    setSelectedReportIndex(index);
    generateMarkdown(reports[index], useLLM);
  };

  const toggleLLM = () => {
    if (!llmAvailable) {
      toast.warn("LLM reports are not available");
      return;
    }
    const newUseLLM = !useLLM;
    setUseLLM(newUseLLM);
    generateMarkdown(reports[selectedReportIndex], newUseLLM);
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-lg py-6">🕒 Loading report data...</div>;
  }

  if (!reports.length && !loading) {
    return <div className="bg-white rounded shadow p-6 text-center text-gray-500 text-lg">🚫 No report data available.</div>;
  }

  const handleDownload = () => {
    if (!pdfRef.current) return;
    const siteName = reports[selectedReportIndex]?.SiteName || "report";
    html2pdf()
      .set({
        margin: 0.5,
        filename: `site-report-${siteName}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(pdfRef.current)
      .save()
      .then(() => {
        toast.success("📄 PDF downloaded successfully!");
      })
      .catch((err) => {
        toast.error("❌ PDF download failed.");
        console.error(err);
      });
  };

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">📝 Report Editor</h2>

      <div className="flex flex-col space-y-4">
        {reports.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Report:
            </label>
            <select
              value={selectedReportIndex}
              onChange={(e) => handleReportChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {reports.map((report, index) => (
                <option key={index} value={index}>
                  {report.SiteName} - {report.SiteAddress}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="useLLM"
            checked={useLLM}
            onChange={toggleLLM}
            disabled={!llmAvailable}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="useLLM" className="ml-2 block text-sm text-gray-700">
            Generate report using LLM format
            {!llmAvailable && (
              <span className="text-xs text-red-500 ml-1">(Unavailable)</span>
            )}
          </label>
        </div>
      </div>

      <Controller
        control={control}
        name="markdown"
        render={({ field }) => (
          <ReactMde
            value={value}
            onChange={(newVal) => {
              setValue(newVal);
              field.onChange(newVal);
            }}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        )}
      />

      <div className="text-center">
        <button
          onClick={handleDownload}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          📥 Export as PDF
        </button>
      </div>

      <div ref={pdfRef} className="hidden print-preview">
  <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br/>") }} />
</div>
    </div>
  );
};

export default ReportBuilder;