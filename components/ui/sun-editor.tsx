"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

export default dynamic(() => import("suneditor-react"), {
  ssr: false,
});