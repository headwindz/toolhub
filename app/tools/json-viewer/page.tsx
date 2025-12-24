"use client";

import { CopyButton } from "@/components/copy-button";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  FileJson,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { JSONViewerKnowledge } from "./json-viewer-knowledge";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

interface TreeNodeProps {
  data: JSONValue;
  name?: string;
  level?: number;
  isLast?: boolean;
}

function TreeNode({ data, name, level = 0, isLast = true }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const isObject =
    data !== null && typeof data === "object" && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isExpandable = isObject || isArray;

  const getValueColor = (value: JSONValue): string => {
    if (value === null) return "text-gray-500";
    if (typeof value === "string") return "text-green-600 dark:text-green-400";
    if (typeof value === "number") return "text-blue-600 dark:text-blue-400";
    if (typeof value === "boolean")
      return "text-purple-600 dark:text-purple-400";
    return "text-foreground";
  };

  const renderValue = (value: JSONValue) => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (typeof value === "string")
      return <span className={getValueColor(value)}>"{value}"</span>;
    return <span className={getValueColor(value)}>{String(value)}</span>;
  };

  const getCollapsedPreview = () => {
    if (isArray) {
      const arr = data as JSONArray;
      if (arr.length === 0) return "[]";

      const preview = arr
        .slice(0, 3)
        .map((item) => {
          if (item === null) return "null";
          if (typeof item === "string")
            return `"${item.length > 20 ? item.slice(0, 20) + "..." : item}"`;
          if (typeof item === "object")
            return Array.isArray(item) ? "[...]" : "{...}";
          return String(item);
        })
        .join(", ");

      return `[${preview}${arr.length > 3 ? ", ..." : ""}]`;
    }

    if (isObject) {
      const obj = data as JSONObject;
      const entries = Object.entries(obj);
      if (entries.length === 0) return "{}";

      const preview = entries
        .slice(0, 3)
        .map(([key, value]) => {
          let valueStr = "";
          if (value === null) valueStr = "null";
          else if (typeof value === "string")
            valueStr = `"${value.length > 15 ? value.slice(0, 15) + "..." : value}"`;
          else if (typeof value === "object")
            valueStr = Array.isArray(value) ? "[...]" : "{...}";
          else valueStr = String(value);
          return `${key}: ${valueStr}`;
        })
        .join(", ");

      return `{${preview}${entries.length > 3 ? ", ..." : ""}}`;
    }
    return null;
  };

  const indent = level * 20;

  if (!isExpandable) {
    return (
      <div
        className="flex py-0.5 items-start hover:bg-muted/30"
        style={{ paddingLeft: `${indent}px` }}
      >
        <span className="flex-shrink-0 w-5" />
        {name && (
          <>
            <span className="font-medium text-blue-700 dark:text-blue-300">
              {name}
            </span>
            <span className="mx-1 text-muted-foreground">:</span>
          </>
        )}
        {renderValue(data)}
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    );
  }

  const entries = isArray
    ? (data as JSONArray).map(
        (value, index) => [index.toString(), value] as [string, JSONValue],
      )
    : Object.entries(data as JSONObject);

  return (
    <div>
      <div
        className="rounded cursor-pointer flex py-0.5 items-start hover:bg-muted/50"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button className="flex flex-shrink-0 h-5 text-muted-foreground w-5 items-center justify-center hover:text-foreground">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {name && (
          <>
            <span className="font-medium text-blue-700 dark:text-blue-300">
              {name}
            </span>
            <span className="mx-1 text-muted-foreground">:</span>
          </>
        )}
        {isExpanded ? (
          <span className="text-muted-foreground">{isArray ? "[" : "{"}</span>
        ) : (
          <span className="text-muted-foreground">
            {isArray ? (
              <>
                <span className="text-xs mr-1 text-gray-500 italic dark:text-gray-400">
                  ({(data as JSONArray).length})
                </span>
                {getCollapsedPreview()}
              </>
            ) : (
              <>
                <span className="text-xs mr-1 text-gray-500 italic dark:text-gray-400">
                  ({"{"}...{"}"})
                </span>
                {getCollapsedPreview()}
              </>
            )}
          </span>
        )}
      </div>

      {isExpanded && (
        <div>
          {entries.map(([key, value], index) => (
            <TreeNode
              key={key}
              name={key}
              data={value}
              level={level + 1}
              isLast={index === entries.length - 1}
            />
          ))}
          <div
            className="text-muted-foreground py-0.5"
            style={{ paddingLeft: `${indent + 20}px` }}
          >
            {isArray ? "]" : "}"}
            {!isLast && ","}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JSONViewerPage() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<JSONValue | null>(null);
  const [error, setError] = useState("");

  const parseJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setError("");
    } catch (e) {
      setError("Invalid JSON format");
      setParsedData(null);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Auto-parse on input
    try {
      const parsed = JSON.parse(value);
      setParsedData(parsed);
      setError("");
    } catch (e) {
      setError("");
      setParsedData(null);
    }
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          active: true,
          roles: ["admin", "user"],
          metadata: {
            lastLogin: "2024-12-24T10:30:00Z",
            preferences: {
              theme: "dark",
              notifications: true,
            },
          },
        },
        products: [
          { id: 101, name: "Widget", price: 29.99, inStock: true },
          { id: 102, name: "Gadget", price: 49.99, inStock: false },
        ],
      },
      null,
      2,
    );
    setInput(sample);
    handleInputChange(sample);
  };

  return (
    <ToolLayout
      title="JSON Viewer"
      description="View and explore JSON data in an interactive tree format"
      icon={Eye}
      badges={[
        { label: "Interactive", icon: Sparkles },
        { label: "Collapsible" },
      ]}
    >
      <JSONViewerKnowledge />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
            <h2 className="font-semibold text-xl">Input JSON</h2>
            <p className="text-sm text-muted-foreground">
              Paste your JSON data to visualize
            </p>
          </div>
          <div className="p-6 pt-4">
            <Textarea
              placeholder='{"name": "John", "age": 30, "hobbies": ["reading", "coding"]}'
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`font-mono border-2 shadow-inner text-sm min-h-[450px] transition-colors ${
                error
                  ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/40"
                  : "focus:border-primary"
              }`}
            />
            <div className="flex mt-4 gap-2">
              <Button
                onClick={parseJSON}
                size="lg"
                className="flex-1 shadow-lg"
              >
                <Eye className="h-4 mr-2 w-4" />
                View Tree
              </Button>
              <Button
                onClick={loadSample}
                variant="outline"
                size="lg"
                className="bg-transparent"
              >
                <FileJson className="h-4 mr-2 w-4" />
                Sample
              </Button>
            </div>
            {error && (
              <div className="border rounded-lg bg-destructive/10 border-destructive/50 mt-3 p-3">
                <p className="font-medium text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent flex from-primary/10 via-primary/5 p-6 items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl">Tree View</h2>
              <p className="text-sm text-muted-foreground">
                Click to expand/collapse nodes
              </p>
            </div>
            {parsedData && (
              <CopyButton text={JSON.stringify(parsedData, null, 2)} />
            )}
          </div>
          <div className="p-6 pt-4">
            {parsedData ? (
              <div className="rounded-lg font-mono bg-muted/30 border-2 shadow-inner text-sm min-h-[450px] max-h-[450px] p-4 overflow-y-auto">
                <TreeNode data={parsedData} />
              </div>
            ) : (
              <div className="border-dashed rounded-lg flex border-2 min-h-[450px] items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Eye className="mx-auto h-12 mb-3 opacity-20 w-12" />
                  <p className="font-medium text-sm">Enter JSON to view tree</p>
                  <p className="text-xs">Data will appear here</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
