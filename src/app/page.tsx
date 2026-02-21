import { Layout, Model, TabNode, type IJsonModel } from "flexlayout-react";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { ChartArea } from "../components/charts/chart-area";
import { ChartBar } from "../components/charts/chart-bar";
import { ChartLine } from "../components/charts/chart-line";
import { ChartPie } from "../components/charts/chart-pie";
import { ChartRadar } from "../components/charts/chart-radar";
import { ChartRadial } from "../components/charts/chart-radial";
import { DataTable } from "../components/tables/data-table";

import "flexlayout-react/style/rounded.css";

import data from "./data.json";
import { useRef } from "react";

const json: IJsonModel = {
  global: {
    splitterEnableHandle: true,
    tabEnablePopout: true,
    tabSetEnableActiveIcon: true,
    tabSetMinWidth: 130,
    tabSetMinHeight: 100,
    tabSetEnableTabScrollbar: true,
    borderMinSize: 100,
    borderEnableTabScrollbar: true,
  },
  borders: [
    {
      type: "border",
      location: "bottom",
      children: [
        {
          type: "tab",
          id: "#0ae8e0fb-dba2-4b14-9d75-08781231479a",
          name: "Output",
          component: "grid",
          enableClose: false,
          icon: "images/bar_chart.svg",
        },
        {
          type: "tab",
          id: "#803a2efe-e507-4735-9c2a-46ce6042c1a2",
          name: "Terminal",
          component: "grid",
          enableClose: false,
          icon: "images/terminal.svg",
        },
        {
          type: "tab",
          id: "#7bac972e-fd5f-4582-a511-4feede448394",
          name: "Layout JSON",
          component: "json",
        },
      ],
    },
    {
      type: "border",
      location: "left",
      children: [
        {
          type: "tab",
          id: "#21c49854-be85-4e32-96c3-61962f71bc15",
          name: "Components",
          altName: "The Components Tab",
          component: "grid",
          enableClose: false,
          icon: "images/folder.svg",
        },
      ],
    },
    {
      type: "border",
      location: "right",
      children: [
        {
          type: "tab",
          id: "#ec253996-0724-416b-a097-23f85a89afbe",
          name: "Options",
          component: "grid",
          enableClose: false,
          icon: "images/settings.svg",
        },
      ],
    },
  ],
  layout: {
    type: "row",
    id: "#11b6dde6-2808-4a87-b378-dd6ed2a92547",
    children: [
      {
        type: "row",
        id: "#cec0f587-2651-4bb2-a755-006a7111bb11",
        weight: 33,
        children: [
          {
            type: "tabset",
            id: "#770c0042-3776-4576-becc-90b627bb8c91",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                id: "#a7dff07f-a37a-4d58-9853-7b91c465101c",
                name: "Area Chart",
                component: "area",
                enableWindowReMount: true,
                enablePopoutOverlay: true,
              },
              {
                type: "tab",
                id: "#963c76b2-ea75-4cf9-8677-823fb1aec5ea",
                name: "Bar Chart",
                component: "bar",
                icon: "images/article.svg",
              },
              {
                type: "tab",
                id: "#8bba601c-b902-432a-bc3f-5e076dafdf1d",
                name: "Line Chart",
                component: "line",
                icon: "images/article.svg",
              },
              {
                type: "tab",
                id: "#b89da41a-933d-4784-b4b9-c9a7d19aea0d",
                name: "Pie Chart",
                component: "pie",
                icon: "images/article.svg",
              },
              {
                type: "tab",
                id: "#b9ffea20-84d7-430d-ad16-947b26127fbc",
                name: "Radar Chart",
                component: "radar",
                icon: "images/article.svg",
              },
              {
                type: "tab",
                id: "#bebb3b66-bcba-449e-a9b8-774e92fa8c37",
                name: "Radial Chart",
                component: "radial",
                icon: "images/article.svg",
              },
            ],
            active: true,
          },
          {
            type: "tabset",
            id: "#c0b4aba3-dba9-4883-a384-1b299518fd0b",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "#285406e5-6795-4e17-b10d-6ff8e512ba62",
                name: "Data Table",
                component: "table",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        id: "#6b135a77-d283-404e-8a92-4bb5bf2579cb",
        weight: 33,
        children: [
          {
            type: "tabset",
            id: "#b97c51f2-7f2c-490d-9cbb-6fcb189c2343",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "#0e23b4b3-498a-4625-a916-b1e6e19eaf3f",
                name: "Wikipedia",
                component: "multitype",
                config: {
                  type: "url",
                  data: "https://en.wikipedia.org/wiki/Main_Page",
                },
              },
            ],
          },
          {
            type: "tabset",
            id: "#a1d1e2b2-246c-4116-a616-cb3d186b5743",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "#4784d2d4-24a4-4ef2-ac6e-7a3ea7b03ba3",
                name: "Data Table",
                enablePopout: false,
                component: "table",
              },
            ],
          },
        ],
      },
    ],
  },
  popouts: {},
};

export default function Page() {
  const layoutRef = useRef<Layout | null>(null);
  const nextGridIndex = useRef<number>(1);

  // create model once
  const model = Model.fromJson(json);

  // factory renders content for nodes based on node.getComponent()
  const factory = (node: TabNode) => {
    const component = node.getComponent();
    const config = node.getConfig ? node.getConfig() : {};

    if (component === "text") {
      return (
        <div style={{ padding: 12, height: "100%", overflow: "auto" }}>
          <h3 style={{ marginTop: 0 }}>{node.getName()}</h3>
          <div>{config.text}</div>
        </div>
      );
    } else if (component === "multitype") {
      try {
        const config = node.getConfig();
        if (config.type === "url") {
          return (
            <iframe
              title={node.getId()}
              src={config.data}
              style={{
                display: "block",
                border: "none",
                boxSizing: "border-box",
              }}
              width="100%"
              height="100%"
            />
          );
        } else if (config.type === "html") {
          return <div dangerouslySetInnerHTML={{ __html: config.data }} />;
        } else if (config.type === "text") {
          return (
            <textarea
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resize: "none",
                boxSizing: "border-box",
                border: "none",
              }}
              defaultValue={config.data}
            />
          );
        }
      } catch (e) {
        return <div>{String(e)}</div>;
      }
    } else if (component === "area") {
      return <ChartArea />;
    } else if (component === "bar") {
      return <ChartBar />;
    } else if (component === "line") {
      return <ChartLine />;
    } else if (component === "pie") {
      return <ChartPie />;
    } else if (component === "radar") {
      return <ChartRadar />;
    } else if (component === "radial") {
      return <ChartRadial />;
    } else if (component === "table") {
      return <DataTable data={data} />;
    }

    // default fallback
    return <div style={{ padding: 8 }}>Unknown component: {component}</div>;
  };

  const onDragStart =
    (componentType: string, componentName: string) =>
    (event: React.DragEvent<HTMLElement>) => {
      event.stopPropagation();
      const tabName = componentName + " " + nextGridIndex.current++;
      event.dataTransfer.setData(
        "text/plain",
        "FlexLayoutTab:" + JSON.stringify({ name: tabName }),
      );
      layoutRef.current!.setDragComponent(event.nativeEvent, tabName, 10, 10);
      layoutRef.current!.addTabWithDragAndDrop(event.nativeEvent, {
        name: tabName,
        component: componentType,
        icon: "images/article.svg",
      });
    };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col flex-1 px-4 py-4">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex gap-2 p-3 border rounded-lg bg-background">
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-blue-50 hover:bg-blue-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Area Chart"
                onDragStart={onDragStart("area", "Area Chart")}
              >
                📊 Area Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-green-50 hover:bg-green-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Bar Chart"
                onDragStart={onDragStart("bar", "Bar Chart")}
              >
                📊 Bar Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-purple-50 hover:bg-purple-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Line Chart"
                onDragStart={onDragStart("line", "Line Chart")}
              >
                📈 Line Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-yellow-50 hover:bg-yellow-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Pie Chart"
                onDragStart={onDragStart("pie", "Pie Chart")}
              >
                🥧 Pie Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-pink-50 hover:bg-pink-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Radar Chart"
                onDragStart={onDragStart("radar", "Radar Chart")}
              >
                🎯 Radar Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-indigo-50 hover:bg-indigo-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Radial Chart"
                onDragStart={onDragStart("radial", "Radial Chart")}
              >
                ⭕ Radial Chart
              </button>
              <button
                className="toolbar_control drag-from px-4 py-2 rounded border bg-gray-50 hover:bg-gray-100 cursor-grab active:cursor-grabbing"
                draggable={true}
                title="Drag to add Data Table"
                onDragStart={onDragStart("table", "Data Table")}
              >
                📋 Data Table
              </button>
            </div>
            <div className="flex flex-1 relative">
              <Layout
                ref={layoutRef}
                model={model}
                factory={factory}
                realtimeResize={true}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
