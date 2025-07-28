"use client";

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

function ApiDocsPage() {
  return <SwaggerUI url="/api/docs/swagger" />;
}

export default ApiDocsPage;