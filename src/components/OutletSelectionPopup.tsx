"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close, LocationOn } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Outlet {
  id: number;
  name: string;
  address: string;
  location?: {
    city: string;
    state: string;
  };
}

interface OutletsResponse {
  status: string;
  outlets: Outlet[];
  message?: string;
}

interface OfferResponse {
  status: string;
  offer: {
    id: number;
    title: string;
    discountPercent: number;
    validFrom: string;
    validTo: string;
    daysAvailable: string | null;
    durationHours?: number;
    gameId: number;
    gameName: string;
  } | null;
  message?: string;
}

interface OutletSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  shopId: number;
  restaurantName?: string;
}

const OutletSelectionPopup: React.FC<OutletSelectionPopupProps> = ({
  isOpen,
  onClose,
  shopId,
  restaurantName,
}) => {
  const router = useRouter();
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [isLoadingOutlets, setIsLoadingOutlets] = useState(false);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [outletsError, setOutletsError] = useState<string | null>(null);
  const [selectedOutletId, setSelectedOutletId] = useState<number | null>(null);

  // Fetch outlets when popup opens
  useEffect(() => {
    if (isOpen && shopId) {
      fetchOutlets();
    } else {
      // Reset state when popup closes
      setOutlets([]);
      setOutletsError(null);
      setSelectedOutletId(null);
    }
  }, [isOpen, shopId]);

  const fetchOutlets = async () => {
    try {
      setIsLoadingOutlets(true);
      setOutletsError(null);

      const response = await fetch(`/api/public/vendors/${shopId}/outlets`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data: OutletsResponse = await response.json();

      if (response.ok && data.status === 'success') {
        setOutlets(data.outlets || []);
      } else {
        setOutletsError(data.message || 'Failed to fetch outlets');
        setOutlets([]);
      }
    } catch (err) {
      console.error('Error fetching outlets:', err);
      setOutletsError('Failed to fetch outlets. Please try again.');
      setOutlets([]);
    } finally {
      setIsLoadingOutlets(false);
    }
  };

  const handleOutletSelect = async (outletId: number) => {
    setSelectedOutletId(outletId);
    setIsLoadingOffer(true);

    try {
      // Fetch the offer for the selected outlet
      const response = await fetch(
        `/api/public/vendors/${shopId}/outlets/${outletId}/offers`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      const data: OfferResponse = await response.json();

      if (response.ok && data.status === 'success') {
        if (data.offer && data.offer.gameId) {
          // Navigate to the game details page with offerId to enable Play button
          onClose();
          router.push(`/games/${data.offer.gameId}?offerId=${data.offer.id}`);
        } else {
          // No active offer
          alert('No active offer available for this outlet at the moment.');
          setIsLoadingOffer(false);
          setSelectedOutletId(null);
        }
      } else {
        alert('Failed to fetch offer. Please try again.');
        setIsLoadingOffer(false);
        setSelectedOutletId(null);
      }
    } catch (err) {
      console.error('Error fetching offer:', err);
      alert('Failed to fetch offer. Please try again.');
      setIsLoadingOffer(false);
      setSelectedOutletId(null);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "24px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", marginBottom: "18px" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#666",
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ marginBottom: "0px", mt: "8px" }}>
            <Image
              src="/logoblue.svg"
              alt="GAMES N GO"
              width={168}
              height={42}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {restaurantName && (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#2d2350",
                mt: 2,
                mb: 1,
              }}
            >
              {restaurantName}
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#2d2350",
              mt: 1,
              mb: 2,
            }}
          >
            Select Outlet
          </Typography>
        </Box>

        {/* Outlet List */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "20 20px 40px rgba(0, 0, 0, 0.55)",
            maxHeight: "50vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "2px",
            },
          }}
        >
          {isLoadingOutlets ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
              <CircularProgress size={40} sx={{ color: "#FAC200" }} />
            </Box>
          ) : outletsError ? (
            <Box sx={{ mb: 2 }}>
              <Alert severity="error">{outletsError}</Alert>
            </Box>
          ) : outlets.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography sx={{ color: "#666", fontSize: "14px" }}>
                No outlets available for this vendor.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {outlets.map((outlet) => (
                <Button
                  key={outlet.id}
                  onClick={() => handleOutletSelect(outlet.id)}
                  disabled={isLoadingOffer && selectedOutletId === outlet.id}
                  startIcon={<LocationOn sx={{ color: "#FAC200" }} />}
                  sx={{
                    backgroundColor: "#FFF",
                    color: "#2d2350",
                    borderRadius: "12px",
                    padding: "16px",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    border: "1px solid rgba(0, 0, 0, 0.10)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                    "&:disabled": {
                      backgroundColor: "#f5f5f5",
                      opacity: 0.7,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#2d2350",
                        mb: 0.5,
                        width: "100%",
                      }}
                    >
                      {outlet.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#666",
                        lineHeight: 1.4,
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      {outlet.address}
                    </Typography>
                    {isLoadingOffer && selectedOutletId === outlet.id && (
                      <CircularProgress size={16} sx={{ color: "#FAC200", mt: 1 }} />
                    )}
                  </Box>
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OutletSelectionPopup;

