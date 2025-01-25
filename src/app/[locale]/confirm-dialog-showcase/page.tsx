"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ConfirmDialogShowcase() {
  const [openDanger, setOpenDanger] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLoading(false);
    }, 2000);
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Dialog Component</CardTitle>
            <CardDescription>
              A beautiful and modern confirm dialog component with icons and
              animations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="destructive"
                  onClick={() => setOpenDanger(true)}
                >
                  Danger Dialog
                </Button>
                <ConfirmDialog
                  open={openDanger}
                  onOpenChange={setOpenDanger}
                  title="Delete Account"
                  description="Are you sure you want to delete your account? This action cannot be undone."
                  variant="danger"
                  confirmText="Delete Account"
                />

                <Button variant="warning" onClick={() => setOpenWarning(true)}>
                  Warning Dialog
                </Button>
                <ConfirmDialog
                  open={openWarning}
                  onOpenChange={setOpenWarning}
                  title="Clear Data"
                  description="This will clear all your saved preferences. Are you sure?"
                  variant="warning"
                  confirmText="Clear Data"
                />

                <Button variant="info" onClick={() => setOpenInfo(true)}>
                  Info Dialog
                </Button>
                <ConfirmDialog
                  open={openInfo}
                  onOpenChange={setOpenInfo}
                  title="Update Available"
                  description="A new version is available. Would you like to update now?"
                  variant="info"
                  confirmText="Update Now"
                />

                <Button variant="success" onClick={() => setOpenSuccess(true)}>
                  Success Dialog
                </Button>
                <ConfirmDialog
                  open={openSuccess}
                  onOpenChange={setOpenSuccess}
                  title="Publish Changes"
                  description="Your changes are ready to be published. Would you like to proceed?"
                  variant="success"
                  confirmText="Publish"
                />
              </div>
            </div>

            <Separator />

            {/* Loading State */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Loading State</h3>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setOpenLoading(true)}>
                  Loading Dialog
                </Button>
                <ConfirmDialog
                  open={openLoading}
                  onOpenChange={setOpenLoading}
                  title="Save Changes"
                  description="Your changes will be saved. This might take a moment."
                  variant="info"
                  confirmText="Save Changes"
                  loading={loading}
                  onConfirm={handleLoadingConfirm}
                />
              </div>
            </div>

            <Separator />

            {/* Custom Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Content</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setOpenInfo(true)}>
                  Custom Dialog
                </Button>
                <ConfirmDialog
                  open={openInfo}
                  onOpenChange={setOpenInfo}
                  title="Custom Content Example"
                  variant="info"
                  confirmText="Proceed"
                >
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      You can add any custom content here, such as forms, lists,
                      or other components.
                    </p>
                  </div>
                </ConfirmDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
