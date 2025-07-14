import React from "react";

// Example avatar image (replace with your own asset if needed)
import avatarImg from "../assets/images/1.png";

const ProfilePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 60px)", // adjust for header height if needed
        background: "#f6f7fa",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          width: "1100px",
          minHeight: "500px",
          overflow: "hidden",
        }}
      >
        {/* Profile Card */}
        <div
          style={{
            width: "40%",
            padding: "48px 32px",
            borderRight: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={avatarImg}
            alt="Profile"
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 16,
            }}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: 0,
                marginRight: 12,
              }}
            >
              Sabong Revilla
            </h2>
            <button
              style={{
                background: "#ff7900",
                color: "#fff",
                border: "none",
                borderRadius: 16,
                padding: "4px 16px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          </div>
          <div style={{ width: "100%", marginTop: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: "#222", fontWeight: 500 }}>Guild:</span>
              <span style={{ marginLeft: 8, color: "#222", fontWeight: 700 }}>
                Buyer
              </span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: "#222", fontWeight: 500 }}>
                Member Since:
              </span>
              <span style={{ marginLeft: 8, color: "#222", fontWeight: 700 }}>
                May 15, 2025
              </span>
            </div>
            <div>
              <span style={{ color: "#222", fontWeight: 500 }}>
                Number successful bids:
              </span>
              <span style={{ marginLeft: 8, color: "#222", fontWeight: 700 }}>
                23
              </span>
            </div>
          </div>
        </div>
        {/* Description Section */}
        <div style={{ flex: 1, padding: "48px 40px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
            Description:
          </h3>
          <p style={{ color: "#222", lineHeight: 1.7, marginBottom: 16 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p style={{ color: "#222", lineHeight: 1.7 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
