"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Smartphone,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  Wifi,
  Car,
  Baby,
  Accessibility,
  Coffee,
  BookOpen,
  X,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { MasjidData, MasjidFacility } from "@/types/api";
import {
  formatMasjidDisplayName,
  getDisplayAddress,
  getGoogleMapsUrl,
  getNextPrayer,
  getCurrentPrayerTimes,
  getCurrentPrayerPeriod,
  formatTime,
} from "@/lib/masjid-service";
import { ViewInAppButton } from "@/components/elements/ViewInAppButton";
import {
  generateAboutContent,
  generatePrayerTimesContent,
  generateFacilitiesContent,
  generateGettingThereContent,
} from "@/lib/content-generators";

interface MasjidRedirectClientProps {
  masjidData: MasjidData | null;
  fallbackName: string;
  deepLinkUrl: string;
  masjidId: string;
}

export function MasjidRedirectClient({
  masjidData,
  fallbackName,
  deepLinkUrl,
  masjidId,
}: MasjidRedirectClientProps) {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">(
    "desktop",
  );
  const [showFallback, setShowFallback] = useState(false);
  const [attemptedDeepLink, setAttemptedDeepLink] = useState(false);
  const [selectedFacility, setSelectedFacility] =
    useState<MasjidFacility | null>(null);

  const attemptDeepLink = useCallback(() => {
    let hasAppOpened = false;

    // Create a fallback timer - show masjid profile after 1 second
    const fallbackTimer = setTimeout(() => {
      if (!hasAppOpened) {
        setShowFallback(true);
      }
    }, 1000);

    // Listen for page visibility change (indicates app opened)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hasAppOpened = true;
        clearTimeout(fallbackTimer);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }
    };

    // Listen for blur event (also indicates app opened)
    const handleBlur = () => {
      hasAppOpened = true;
      clearTimeout(fallbackTimer);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Attempt the deep link
    try {
      // Try direct window.location first (works better on iOS)
      window.location.href = deepLinkUrl;
    } catch {
      // Fallback: create a temporary link and click it
      const link = document.createElement("a");
      link.href = deepLinkUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Clean up after 2 seconds regardless
    setTimeout(() => {
      clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      if (!hasAppOpened) {
        setShowFallback(true);
      }
    }, 2000);
  }, [deepLinkUrl]);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setDeviceType("ios");
    } else if (isAndroid) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
      setShowFallback(true); // Desktop users see the masjid profile immediately
      return;
    }

    // For mobile devices, attempt deep link
    if (!attemptedDeepLink && (isIOS || isAndroid)) {
      setAttemptedDeepLink(true);
      attemptDeepLink();
    }
  }, [deepLinkUrl, attemptedDeepLink, attemptDeepLink]);

  const handleTryAgain = () => {
    setAttemptedDeepLink(false);
    setShowFallback(false);
    attemptDeepLink();
  };

  const handleSkipToProfile = () => {
    setShowFallback(true);
  };

  // Get display data from API or fallback
  const displayName = masjidData
    ? formatMasjidDisplayName(masjidData)
    : fallbackName;
  const address = masjidData ? getDisplayAddress(masjidData) : undefined;
  const mapsUrl = masjidData ? getGoogleMapsUrl(masjidData) : null;
  const nextPrayer = masjidData ? getNextPrayer(masjidData) : null;
  const prayerTimes = masjidData ? getCurrentPrayerTimes(masjidData) : null;
  const currentPrayerPeriod = masjidData
    ? getCurrentPrayerPeriod(masjidData)
    : null;
  const aboutContent = masjidData ? generateAboutContent(masjidData) : null;
  const prayerTimesContent = masjidData
    ? generatePrayerTimesContent(masjidData)
    : null;
  const facilitiesContent = masjidData
    ? generateFacilitiesContent(masjidData)
    : null;
  const gettingThereContent = masjidData
    ? generateGettingThereContent(masjidData)
    : null;
  const activeFacilities =
    masjidData?.facilities?.filter((f) => f.status === "open") || [];

  // Helper function to get facility icon
  const getFacilityIcon = (facilityName: string) => {
    const name = facilityName.toLowerCase();
    if (name.includes("wifi") || name.includes("internet")) return Wifi;
    if (name.includes("parking") || name.includes("car")) return Car;
    if (
      name.includes("child") ||
      name.includes("baby") ||
      name.includes("nursery")
    )
      return Baby;
    if (
      name.includes("wheelchair") ||
      name.includes("disabled") ||
      name.includes("access")
    )
      return Accessibility;
    if (
      name.includes("cafe") ||
      name.includes("kitchen") ||
      name.includes("food")
    )
      return Coffee;
    if (
      name.includes("library") ||
      name.includes("book") ||
      name.includes("education")
    )
      return BookOpen;
    return Users; // default icon
  };

  if (!showFallback && (deviceType === "ios" || deviceType === "android")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="animate-pulse">
          <Smartphone className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Opening {displayName}
          </h1>
          {address && <p className="text-gray-500 text-sm mb-2">{address}</p>}
          <p className="text-gray-600 mb-6">
            Redirecting you to the MyLocalMasjid app...
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleTryAgain}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
            <button
              onClick={handleSkipToProfile}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-300"
            >
              View Profile Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md lg:max-w-6xl mx-auto bg-white min-h-screen lg:rounded-3xl lg:shadow-2xl lg:overflow-hidden">
      {/* Header with cover-like design */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white px-6 lg:px-12 py-8 lg:py-16 rounded-b-3xl lg:rounded-b-none relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 lg:w-48 lg:h-48 border border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 lg:w-36 lg:h-36 border border-white rounded-full"></div>
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Masjid name and info */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">
                {displayName}
              </h1>

              {address && (
                <div className="flex items-start mb-4 lg:mb-6">
                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mt-1 mr-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-emerald-100 text-sm lg:text-base leading-relaxed">
                      {address}
                    </p>
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-white bg-white/20 px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Next prayer highlight */}
            {nextPrayer && (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 lg:p-6 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-4">
                  <div className="flex items-center lg:w-full lg:justify-center">
                    <Clock className="w-5 h-5 lg:w-8 lg:h-8 mr-3 lg:mr-0 lg:mb-2" />
                    <div className="lg:text-center">
                      <p className="text-white/90 text-xs lg:text-sm uppercase tracking-wide lg:mb-2">
                        Next Prayer
                      </p>
                      <p className="font-semibold lg:text-xl">
                        {nextPrayer.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right lg:text-center lg:w-full">
                    <p className="text-2xl lg:text-5xl font-bold">
                      {formatTime(nextPrayer.time)}
                    </p>
                    <p className="text-white/80 text-xs lg:text-base capitalize">
                      {nextPrayer.type}
                    </p>

                    {/* Show both times when available */}
                    {nextPrayer.displayInfo?.showBoth && (
                      <div className="mt-2 lg:mt-3 text-white/70">
                        <div className="flex justify-center space-x-4 text-xs lg:text-sm">
                          <div className="text-center">
                            <p className="text-white/60 text-xs uppercase tracking-wide">
                              Start
                            </p>
                            <p className="font-medium">
                              {formatTime(
                                nextPrayer.displayInfo.startTime || "",
                              )}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white/60 text-xs uppercase tracking-wide">
                              Jammat
                            </p>
                            <p className="font-medium">
                              {formatTime(
                                nextPrayer.displayInfo.jammatTime || "",
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="px-6 lg:px-12 py-6 lg:py-12 space-y-6">
        {/* Download App Card - Slim Top Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 opacity-90" />
              <div>
                <h3 className="font-semibold lg:text-lg">
                  Get the Full Experience
                </h3>
                <p className="text-emerald-100 text-xs lg:text-sm">
                  Access {displayName} and thousands more masajid
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-2 lg:space-y-0">
              <ViewInAppButton
                masjidId={masjidId}
                masjidName={displayName}
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:border-white/40"
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid - Mobile: stacked, Desktop: 2:1 ratio */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Prayer Times Card - Mobile: First, Desktop: Right column */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1 lg:order-2">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                  <h3 className="font-semibold text-gray-800">Prayer Times</h3>
                </div>
                {prayerTimes && (
                  <span className="text-xs text-gray-500">
                    {prayerTimes.date}
                  </span>
                )}
              </div>
            </div>

            {prayerTimes ? (
              <div className="p-0">
                {/* Prayer Times Table */}
                <div className="divide-y divide-gray-100">
                  {[
                    {
                      name: "Fajr",
                      start: prayerTimes.fajr.start,
                      jammat: prayerTimes.fajr.jammat,
                      isMainPrayer: true,
                    },
                    {
                      name: "Sunrise",
                      start: prayerTimes.sunrise,
                      jammat: null,
                      isMainPrayer: false,
                    },
                    {
                      name: "Dhuhr",
                      start: prayerTimes.dhuhr.start,
                      jammat: prayerTimes.dhuhr.jammat,
                      isMainPrayer: true,
                    },
                    {
                      name: "Asr",
                      start: prayerTimes.asr.start,
                      jammat: prayerTimes.asr.jammat,
                      isMainPrayer: true,
                    },
                    {
                      name: "Maghrib",
                      start: prayerTimes.maghrib.start,
                      jammat: prayerTimes.maghrib.jammat,
                      isMainPrayer: true,
                    },
                    {
                      name: "Isha",
                      start: prayerTimes.isha.start,
                      jammat: prayerTimes.isha.jammat,
                      isMainPrayer: true,
                    },
                  ].map((prayer) => {
                    const isCurrentPeriod = currentPrayerPeriod === prayer.name;
                    const isNextPrayer =
                      nextPrayer?.name === prayer.name ||
                      nextPrayer?.name === `${prayer.name} Jammat`;

                    // Apply lower opacity to sunrise unless it's current
                    const sunriseOpacity =
                      prayer.name === "Sunrise" && !isCurrentPeriod
                        ? "opacity-50"
                        : "";

                    return (
                      <div
                        key={prayer.name}
                        className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${sunriseOpacity} ${
                          isCurrentPeriod
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : isNextPrayer
                              ? "bg-emerald-50 border-l-4 border-emerald-500"
                              : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isCurrentPeriod
                                ? "bg-blue-500"
                                : isNextPrayer
                                  ? "bg-emerald-500"
                                  : "bg-gray-300"
                            }`}
                          ></div>
                          <span
                            className={`font-medium ${
                              isCurrentPeriod
                                ? "text-blue-800"
                                : "text-gray-800"
                            }`}
                          >
                            {prayer.name}
                            {isCurrentPeriod && (
                              <span className="text-blue-600 text-xs ml-2">
                                (Current)
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          {prayer.name === "Sunrise" ? (
                            // Sunrise - only show time without labels
                            <div className="text-right">
                              <p className="font-medium text-gray-800">
                                {formatTime(prayer.start)}
                              </p>
                            </div>
                          ) : (
                            // Regular prayers - show start and jammat
                            <>
                              <div className="text-right">
                                <p className="text-gray-500 text-xs uppercase tracking-wide">
                                  Start
                                </p>
                                <p className="font-medium text-gray-800">
                                  {formatTime(prayer.start)}
                                </p>
                              </div>
                              {prayer.jammat && (
                                <div className="text-right">
                                  <p className="text-emerald-600 text-xs uppercase tracking-wide">
                                    Jammat
                                  </p>
                                  <p className="font-medium text-emerald-700">
                                    {formatTime(prayer.jammat)}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Jummah Times Section - Same design as prayer rows */}
                  {masjidData?.special_prayers &&
                  masjidData.special_prayers.filter((p) => p.active).length >
                    0 ? (
                    <>
                      {/* Spacer */}
                      <div className="h-4 bg-gray-50"></div>

                      {masjidData.special_prayers
                        .filter((prayer) => prayer.active)
                        .map((jummah) => (
                          <div
                            key={jummah.id}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="font-medium text-gray-800">
                                {jummah.label}
                              </span>
                            </div>
                            <div className="flex items-center space-x-6 text-sm">
                              {jummah.start_time && (
                                <div className="text-right">
                                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                                    Start
                                  </p>
                                  <p className="font-medium text-gray-800">
                                    {formatTime(jummah.start_time)}
                                  </p>
                                </div>
                              )}
                              {jummah.jammat_time && (
                                <div className="text-right">
                                  <p className="text-emerald-600 text-xs uppercase tracking-wide">
                                    Jammat
                                  </p>
                                  <p className="font-medium text-emerald-700">
                                    {formatTime(jummah.jammat_time)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    prayerTimes && (
                      <>
                        {/* Spacer */}
                        <div className="h-4 bg-gray-50"></div>

                        {/* No Jummah Times Message */}
                        <div className="px-6 py-4 text-center bg-gray-50">
                          <div className="flex items-center justify-center space-x-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              No Jummah times available
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Contact the masjid for Jummah prayer schedules
                          </p>
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="font-medium text-gray-700 mb-2">
                  No Prayer Times Available
                </h4>
                <p className="text-gray-500 text-sm mb-4">
                  Prayer times are not currently available for this masjid.
                  Please contact the masjid directly for prayer schedules.
                </p>
                <div className="text-xs text-gray-400">
                  Help us improve by encouraging the masjid to update their
                  prayer times.
                </div>
              </div>
            )}
          </div>

          {/* Facilities Card - Mobile: Second (full width), Desktop: Left 2 columns */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2 lg:order-1">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-emerald-600 mr-3" />
                <h3 className="font-semibold text-gray-800">Facilities</h3>
              </div>
            </div>

            {masjidData?.facilities && masjidData.facilities.length > 0 ? (
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {masjidData.facilities
                    .filter((f) => f.active)
                    .map((facility) => {
                      const IconComponent = getFacilityIcon(facility.name);
                      const getStatusColors = (status: string) => {
                        switch (status.toLowerCase()) {
                          case "open":
                            return {
                              bg: "bg-green-500",
                              border: "border-green-200",
                              text: "text-green-800",
                              icon: "text-green-600",
                              cardBg: "bg-green-50",
                            };
                          case "closed":
                            return {
                              bg: "bg-red-500",
                              border: "border-red-200",
                              text: "text-red-800",
                              icon: "text-red-600",
                              cardBg: "bg-red-50",
                            };
                          case "maintenance":
                            return {
                              bg: "bg-orange-500",
                              border: "border-orange-200",
                              text: "text-orange-800",
                              icon: "text-orange-600",
                              cardBg: "bg-orange-50",
                            };
                          default:
                            return {
                              bg: "bg-yellow-500",
                              border: "border-yellow-200",
                              text: "text-yellow-800",
                              icon: "text-yellow-600",
                              cardBg: "bg-yellow-50",
                            };
                        }
                      };

                      const colors = getStatusColors(facility.status);

                      return (
                        <div
                          key={facility.id}
                          onClick={() => setSelectedFacility(facility)}
                          className={`relative flex-shrink-0 ${colors.cardBg} ${colors.border} border rounded-2xl p-4 min-w-[140px] max-w-[180px] transition-all hover:shadow-md hover:scale-105 cursor-pointer`}
                        >
                          {/* Status indicator dot */}
                          <div
                            className={`absolute top-3 right-3 w-3 h-3 ${colors.bg} rounded-full shadow-sm`}
                          ></div>

                          <div className="flex flex-col items-center text-center space-y-3">
                            <div
                              className={`p-3 bg-white rounded-xl shadow-sm`}
                            >
                              <IconComponent
                                className={`w-6 h-6 ${colors.icon}`}
                              />
                            </div>

                            <div className="space-y-1">
                              <h4 className="font-medium text-gray-800 text-sm leading-tight">
                                {facility.name}
                              </h4>

                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.text} bg-white/80`}
                              >
                                {facility.status}
                              </span>
                            </div>

                            {facility.description && (
                              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                {facility.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="font-medium text-gray-700 mb-2">
                  No Facilities Information
                </h4>
                <p className="text-gray-500 text-sm mb-4">
                  Facility information is not currently available for this
                  masjid. Please contact the masjid directly for details about
                  available amenities.
                </p>
                <div className="text-xs text-gray-400">
                  Help us improve by encouraging the masjid to update their
                  facility information.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contribute Section - Submit Data & Report Issue */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl p-6 mt-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">
              Help Keep Information Accurate
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Your contributions help the community stay informed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Submit Data Button */}
            <Link
              href={`/masjid/${masjidId}/${encodeURIComponent(displayName.toLowerCase().replace(/\s+/g, "-"))}/submit-data`}
              className="flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-emerald-800 block">
                  Submit Data
                </span>
                <span className="text-xs text-emerald-600">
                  Prayer times, facilities & more
                </span>
              </div>
            </Link>

            {/* Report Issue Button */}
            <Link
              href={`/masjid/${masjidId}/${encodeURIComponent(displayName.toLowerCase().replace(/\s+/g, "-"))}/report-issue`}
              className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-amber-800 block">
                  Report Issue
                </span>
                <span className="text-xs text-amber-600">
                  Wrong info? Let us know
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* SEO Content Section - Moved below grid */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
          <div className="text-center lg:text-left">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
              {displayName} Prayer Times{" "}
              {masjidData?.location?.city && `in ${masjidData.location.city}`}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Get accurate and up-to-date prayer times for {displayName}
              {address && ` located in ${address}`}. Our comprehensive prayer
              schedule includes daily Fajr, Dhuhr, Asr, Maghrib, and Isha prayer
              times, along with jamaat congregation times for the local Muslim
              community.
              {masjidData?.location?.city &&
                ` Find reliable ${masjidData.location.city} masjid prayer times, `}
              salah times, and salah schedules to help you maintain your daily
              prayers. Stay connected with accurate Islamic prayer times and
              masjid services in your area.
            </p>
          </div>
        </div>

        {/* About Section */}
        {aboutContent && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About {displayName}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {aboutContent}
            </p>
          </section>
        )}

        {/* Prayer Times Content Section */}
        {prayerTimesContent && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Prayer Times at {displayName}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {prayerTimesContent}
            </p>
            {masjidData?.current_prayer_times && (
              <div className="text-sm text-gray-500">
                <p>
                  Today&apos;s prayer times: Fajr{" "}
                  {formatTime(masjidData.current_prayer_times.fajr_start)},
                  Dhuhr {formatTime(masjidData.current_prayer_times.dhur_start)}
                  , Asr {formatTime(masjidData.current_prayer_times.asr_start)},
                  Maghrib{" "}
                  {formatTime(masjidData.current_prayer_times.magrib_start)},
                  Isha {formatTime(masjidData.current_prayer_times.isha_start)}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Facilities Section */}
        {(facilitiesContent || activeFacilities.length > 0) && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Facilities at {displayName}
            </h2>
            {facilitiesContent && (
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {facilitiesContent}
              </p>
            )}
            {activeFacilities.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {activeFacilities.map((facility) => (
                  <li key={facility.id}>{facility.name}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Getting There Section */}
        {gettingThereContent && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Getting to {displayName}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {gettingThereContent}
            </p>
            {masjidData?.location && mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700"
              >
                <MapPin className="w-4 h-4 mr-1" />
                View on Google Maps
              </a>
            )}
          </section>
        )}
      </div>

      {/* Facility Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedFacility.name}
              </h3>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status */}
              <div className="mb-4">
                <span className="text-sm text-gray-600">Status</span>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedFacility.status === "open"
                        ? "bg-green-100 text-green-800"
                        : selectedFacility.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : selectedFacility.status === "maintenance"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedFacility.status.charAt(0).toUpperCase() +
                      selectedFacility.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedFacility.description && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Description</span>
                  <p className="mt-1 text-gray-800 leading-relaxed">
                    {selectedFacility.description}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Facility Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="text-gray-800">
                      {selectedFacility.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-gray-800 capitalize">
                      {selectedFacility.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="text-gray-800">
                      {selectedFacility.active ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
