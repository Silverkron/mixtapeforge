# JUCE 7.0.12 contains a screen-capture call removed from recent macOS SDKs.
# This console audio host does not expose native-window screenshots. Preserve
# the existing local compatibility patch when checking out the pinned submodule.
set(snapshot_file "${CMAKE_CURRENT_LIST_DIR}/../vendor/juce/modules/juce_gui_basics/native/juce_Windowing_mac.mm")
file(READ "${snapshot_file}" snapshot_source)
string(FIND "${snapshot_source}" "CGImageRef screenShot = CGWindowListCreateImage" obsolete_call)
if(NOT obsolete_call EQUAL -1)
    string(FIND "${snapshot_source}" "static Image createNSWindowSnapshot (NSWindow* nsWindow)" snapshot_start)
    string(FIND "${snapshot_source}" "Image createSnapshotOfNativeWindow (void* nativeWindowHandle)" snapshot_end)
    if(snapshot_start LESS 0 OR snapshot_end LESS snapshot_start)
        message(FATAL_ERROR "Unexpected JUCE source: cannot apply the documented macOS compatibility patch")
    endif()
    string(SUBSTRING "${snapshot_source}" 0 ${snapshot_start} snapshot_prefix)
    string(SUBSTRING "${snapshot_source}" ${snapshot_end} -1 snapshot_suffix)
    set(snapshot_replacement [==[
static Image createNSWindowSnapshot (NSWindow* nsWindow)
{
    JUCE_AUTORELEASEPOOL
    {
        // CGWindowListCreateImage is replaced by functions in the ScreenCaptureKit framework, but
        // that framework is only available from macOS 12.3 onwards.
        // A suitable @available check should be added once the minimum build OS is 12.3 or greater,
        // so that ScreenCaptureKit can be weak-linked.
       #if defined (MAC_OS_VERSION_14_0) && MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_VERSION_14_0
        JUCE_BEGIN_IGNORE_WARNINGS_GCC_LIKE ("-Wdeprecated-declarations")
        #define JUCE_DEPRECATION_IGNORED 1
       #endif

        // Cassette host: screen capture is unused; obsolete API removed for SDK 15+.
        return {};

    }
}

]==])
    file(WRITE "${snapshot_file}" "${snapshot_prefix}${snapshot_replacement}${snapshot_suffix}")
endif()
