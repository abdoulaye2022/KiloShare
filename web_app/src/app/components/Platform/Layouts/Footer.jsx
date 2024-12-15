"use client";

import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "white",
        }}
      >
        Kilo-Share © {new Date().getFullYear()} Created by{" "}
        <Link href="https://m2atech.com" target="_blank">
          M2atech
        </Link>{" "}
        All rights reserved
      </div>
    </>
  );
}

export default Footer;
