/* eslint-disable */
import { Timestamp } from "@aperturerobotics/ts-proto-common-types/google/protobuf/timestamp.pb.js";
import { BoolValue, Int64Value } from "@aperturerobotics/ts-proto-common-types/google/protobuf/wrappers.pb.js";
import Long from "long";
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "csi.v1";

/** Intentionally empty. */
export interface GetPluginInfoRequest {
}

export interface GetPluginInfoResponse {
  /**
   * The name MUST follow domain name notation format
   * (https://tools.ietf.org/html/rfc1035#section-2.3.1). It SHOULD
   * include the plugin's host company name and the plugin name,
   * to minimize the possibility of collisions. It MUST be 63
   * characters or less, beginning and ending with an alphanumeric
   * character ([a-z0-9A-Z]) with dashes (-), dots (.), and
   * alphanumerics between. This field is REQUIRED.
   */
  name: string;
  /** This field is REQUIRED. Value of this field is opaque to the CO. */
  vendorVersion: string;
  /** This field is OPTIONAL. Values are opaque to the CO. */
  manifest: { [key: string]: string };
}

export interface GetPluginInfoResponse_ManifestEntry {
  key: string;
  value: string;
}

/** Intentionally empty. */
export interface GetPluginCapabilitiesRequest {
}

export interface GetPluginCapabilitiesResponse {
  /**
   * All the capabilities that the controller service supports. This
   * field is OPTIONAL.
   */
  capabilities: PluginCapability[];
}

/** Specifies a capability of the plugin. */
export interface PluginCapability {
  type?: { $case: "service"; service: PluginCapability_Service } | {
    $case: "volumeExpansion";
    volumeExpansion: PluginCapability_VolumeExpansion;
  };
}

export interface PluginCapability_Service {
  type: PluginCapability_Service_Type;
}

export enum PluginCapability_Service_Type {
  UNKNOWN = 0,
  /**
   * CONTROLLER_SERVICE - CONTROLLER_SERVICE indicates that the Plugin provides RPCs for
   * the ControllerService. Plugins SHOULD provide this capability.
   * In rare cases certain plugins MAY wish to omit the
   * ControllerService entirely from their implementation, but such
   * SHOULD NOT be the common case.
   * The presence of this capability determines whether the CO will
   * attempt to invoke the REQUIRED ControllerService RPCs, as well
   * as specific RPCs as indicated by ControllerGetCapabilities.
   */
  CONTROLLER_SERVICE = 1,
  /**
   * VOLUME_ACCESSIBILITY_CONSTRAINTS - VOLUME_ACCESSIBILITY_CONSTRAINTS indicates that the volumes for
   * this plugin MAY NOT be equally accessible by all nodes in the
   * cluster. The CO MUST use the topology information returned by
   * CreateVolumeRequest along with the topology information
   * returned by NodeGetInfo to ensure that a given volume is
   * accessible from a given node when scheduling workloads.
   */
  VOLUME_ACCESSIBILITY_CONSTRAINTS = 2,
  /**
   * GROUP_CONTROLLER_SERVICE - GROUP_CONTROLLER_SERVICE indicates that the Plugin provides
   * RPCs for operating on groups of volumes. Plugins MAY provide
   * this capability.
   * The presence of this capability determines whether the CO will
   * attempt to invoke the REQUIRED GroupController service RPCs, as
   * well as specific RPCs as indicated by
   * GroupControllerGetCapabilities.
   */
  GROUP_CONTROLLER_SERVICE = 3,
  UNRECOGNIZED = -1,
}

export function pluginCapability_Service_TypeFromJSON(object: any): PluginCapability_Service_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return PluginCapability_Service_Type.UNKNOWN;
    case 1:
    case "CONTROLLER_SERVICE":
      return PluginCapability_Service_Type.CONTROLLER_SERVICE;
    case 2:
    case "VOLUME_ACCESSIBILITY_CONSTRAINTS":
      return PluginCapability_Service_Type.VOLUME_ACCESSIBILITY_CONSTRAINTS;
    case 3:
    case "GROUP_CONTROLLER_SERVICE":
      return PluginCapability_Service_Type.GROUP_CONTROLLER_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PluginCapability_Service_Type.UNRECOGNIZED;
  }
}

export function pluginCapability_Service_TypeToJSON(object: PluginCapability_Service_Type): string {
  switch (object) {
    case PluginCapability_Service_Type.UNKNOWN:
      return "UNKNOWN";
    case PluginCapability_Service_Type.CONTROLLER_SERVICE:
      return "CONTROLLER_SERVICE";
    case PluginCapability_Service_Type.VOLUME_ACCESSIBILITY_CONSTRAINTS:
      return "VOLUME_ACCESSIBILITY_CONSTRAINTS";
    case PluginCapability_Service_Type.GROUP_CONTROLLER_SERVICE:
      return "GROUP_CONTROLLER_SERVICE";
    case PluginCapability_Service_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PluginCapability_VolumeExpansion {
  type: PluginCapability_VolumeExpansion_Type;
}

export enum PluginCapability_VolumeExpansion_Type {
  UNKNOWN = 0,
  /**
   * ONLINE - ONLINE indicates that volumes may be expanded when published to
   * a node. When a Plugin implements this capability it MUST
   * implement either the EXPAND_VOLUME controller capability or the
   * EXPAND_VOLUME node capability or both. When a plugin supports
   * ONLINE volume expansion and also has the EXPAND_VOLUME
   * controller capability then the plugin MUST support expansion of
   * volumes currently published and available on a node. When a
   * plugin supports ONLINE volume expansion and also has the
   * EXPAND_VOLUME node capability then the plugin MAY support
   * expansion of node-published volume via NodeExpandVolume.
   *
   * Example 1: Given a shared filesystem volume (e.g. GlusterFs),
   *   the Plugin may set the ONLINE volume expansion capability and
   *   implement ControllerExpandVolume but not NodeExpandVolume.
   *
   * Example 2: Given a block storage volume type (e.g. EBS), the
   *   Plugin may set the ONLINE volume expansion capability and
   *   implement both ControllerExpandVolume and NodeExpandVolume.
   *
   * Example 3: Given a Plugin that supports volume expansion only
   *   upon a node, the Plugin may set the ONLINE volume
   *   expansion capability and implement NodeExpandVolume but not
   *   ControllerExpandVolume.
   */
  ONLINE = 1,
  /**
   * OFFLINE - OFFLINE indicates that volumes currently published and
   * available on a node SHALL NOT be expanded via
   * ControllerExpandVolume. When a plugin supports OFFLINE volume
   * expansion it MUST implement either the EXPAND_VOLUME controller
   * capability or both the EXPAND_VOLUME controller capability and
   * the EXPAND_VOLUME node capability.
   *
   * Example 1: Given a block storage volume type (e.g. Azure Disk)
   *   that does not support expansion of "node-attached" (i.e.
   *   controller-published) volumes, the Plugin may indicate
   *   OFFLINE volume expansion support and implement both
   *   ControllerExpandVolume and NodeExpandVolume.
   */
  OFFLINE = 2,
  UNRECOGNIZED = -1,
}

export function pluginCapability_VolumeExpansion_TypeFromJSON(object: any): PluginCapability_VolumeExpansion_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return PluginCapability_VolumeExpansion_Type.UNKNOWN;
    case 1:
    case "ONLINE":
      return PluginCapability_VolumeExpansion_Type.ONLINE;
    case 2:
    case "OFFLINE":
      return PluginCapability_VolumeExpansion_Type.OFFLINE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PluginCapability_VolumeExpansion_Type.UNRECOGNIZED;
  }
}

export function pluginCapability_VolumeExpansion_TypeToJSON(object: PluginCapability_VolumeExpansion_Type): string {
  switch (object) {
    case PluginCapability_VolumeExpansion_Type.UNKNOWN:
      return "UNKNOWN";
    case PluginCapability_VolumeExpansion_Type.ONLINE:
      return "ONLINE";
    case PluginCapability_VolumeExpansion_Type.OFFLINE:
      return "OFFLINE";
    case PluginCapability_VolumeExpansion_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Intentionally empty. */
export interface ProbeRequest {
}

export interface ProbeResponse {
  /**
   * Readiness allows a plugin to report its initialization status back
   * to the CO. Initialization for some plugins MAY be time consuming
   * and it is important for a CO to distinguish between the following
   * cases:
   *
   * 1) The plugin is in an unhealthy state and MAY need restarting. In
   *    this case a gRPC error code SHALL be returned.
   * 2) The plugin is still initializing, but is otherwise perfectly
   *    healthy. In this case a successful response SHALL be returned
   *    with a readiness value of `false`. Calls to the plugin's
   *    Controller and/or Node services MAY fail due to an incomplete
   *    initialization state.
   * 3) The plugin has finished initializing and is ready to service
   *    calls to its Controller and/or Node services. A successful
   *    response is returned with a readiness value of `true`.
   *
   * This field is OPTIONAL. If not present, the caller SHALL assume
   * that the plugin is in a ready state and is accepting calls to its
   * Controller and/or Node services (according to the plugin's reported
   * capabilities).
   */
  ready: boolean | undefined;
}

export interface CreateVolumeRequest {
  /**
   * The suggested name for the storage space. This field is REQUIRED.
   * It serves two purposes:
   * 1) Idempotency - This name is generated by the CO to achieve
   *    idempotency.  The Plugin SHOULD ensure that multiple
   *    `CreateVolume` calls for the same name do not result in more
   *    than one piece of storage provisioned corresponding to that
   *    name. If a Plugin is unable to enforce idempotency, the CO's
   *    error recovery logic could result in multiple (unused) volumes
   *    being provisioned.
   *    In the case of error, the CO MUST handle the gRPC error codes
   *    per the recovery behavior defined in the "CreateVolume Errors"
   *    section below.
   *    The CO is responsible for cleaning up volumes it provisioned
   *    that it no longer needs. If the CO is uncertain whether a volume
   *    was provisioned or not when a `CreateVolume` call fails, the CO
   *    MAY call `CreateVolume` again, with the same name, to ensure the
   *    volume exists and to retrieve the volume's `volume_id` (unless
   *    otherwise prohibited by "CreateVolume Errors").
   * 2) Suggested name - Some storage systems allow callers to specify
   *    an identifier by which to refer to the newly provisioned
   *    storage. If a storage system supports this, it can optionally
   *    use this name as the identifier for the new volume.
   * Any Unicode string that conforms to the length limit is allowed
   * except those containing the following banned characters:
   * U+0000-U+0008, U+000B, U+000C, U+000E-U+001F, U+007F-U+009F.
   * (These are control characters other than commonly used whitespace.)
   */
  name: string;
  /**
   * This field is OPTIONAL. This allows the CO to specify the capacity
   * requirement of the volume to be provisioned. If not specified, the
   * Plugin MAY choose an implementation-defined capacity range. If
   * specified it MUST always be honored, even when creating volumes
   * from a source; which MAY force some backends to internally extend
   * the volume after creating it.
   */
  capacityRange:
    | CapacityRange
    | undefined;
  /**
   * The capabilities that the provisioned volume MUST have. SP MUST
   * provision a volume that will satisfy ALL of the capabilities
   * specified in this list. Otherwise SP MUST return the appropriate
   * gRPC error code.
   * The Plugin MUST assume that the CO MAY use the provisioned volume
   * with ANY of the capabilities specified in this list.
   * For example, a CO MAY specify two volume capabilities: one with
   * access mode SINGLE_NODE_WRITER and another with access mode
   * MULTI_NODE_READER_ONLY. In this case, the SP MUST verify that the
   * provisioned volume can be used in either mode.
   * This also enables the CO to do early validation: If ANY of the
   * specified volume capabilities are not supported by the SP, the call
   * MUST return the appropriate gRPC error code.
   * This field is REQUIRED.
   */
  volumeCapabilities: VolumeCapability[];
  /**
   * Plugin specific parameters passed in as opaque key-value pairs.
   * This field is OPTIONAL. The Plugin is responsible for parsing and
   * validating these parameters. COs will treat these as opaque.
   */
  parameters: { [key: string]: string };
  /**
   * Secrets required by plugin to complete volume creation request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
  /**
   * If specified, the new volume will be pre-populated with data from
   * this source. This field is OPTIONAL.
   */
  volumeContentSource:
    | VolumeContentSource
    | undefined;
  /**
   * Specifies where (regions, zones, racks, etc.) the provisioned
   * volume MUST be accessible from.
   * An SP SHALL advertise the requirements for topological
   * accessibility information in documentation. COs SHALL only specify
   * topological accessibility information supported by the SP.
   * This field is OPTIONAL.
   * This field SHALL NOT be specified unless the SP has the
   * VOLUME_ACCESSIBILITY_CONSTRAINTS plugin capability.
   * If this field is not specified and the SP has the
   * VOLUME_ACCESSIBILITY_CONSTRAINTS plugin capability, the SP MAY
   * choose where the provisioned volume is accessible from.
   */
  accessibilityRequirements: TopologyRequirement | undefined;
}

export interface CreateVolumeRequest_ParametersEntry {
  key: string;
  value: string;
}

export interface CreateVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

/**
 * Specifies what source the volume will be created from. One of the
 * type fields MUST be specified.
 */
export interface VolumeContentSource {
  type?: { $case: "snapshot"; snapshot: VolumeContentSource_SnapshotSource } | {
    $case: "volume";
    volume: VolumeContentSource_VolumeSource;
  };
}

export interface VolumeContentSource_SnapshotSource {
  /**
   * Contains identity information for the existing source snapshot.
   * This field is REQUIRED. Plugin is REQUIRED to support creating
   * volume from snapshot if it supports the capability
   * CREATE_DELETE_SNAPSHOT.
   */
  snapshotId: string;
}

export interface VolumeContentSource_VolumeSource {
  /**
   * Contains identity information for the existing source volume.
   * This field is REQUIRED. Plugins reporting CLONE_VOLUME
   * capability MUST support creating a volume from another volume.
   */
  volumeId: string;
}

export interface CreateVolumeResponse {
  /**
   * Contains all attributes of the newly created volume that are
   * relevant to the CO along with information required by the Plugin
   * to uniquely identify the volume. This field is REQUIRED.
   */
  volume: Volume | undefined;
}

/** Specify a capability of a volume. */
export interface VolumeCapability {
  accessType?:
    | { $case: "block"; block: VolumeCapability_BlockVolume }
    | { $case: "mount"; mount: VolumeCapability_MountVolume };
  /** This is a REQUIRED field. */
  accessMode: VolumeCapability_AccessMode | undefined;
}

/** Indicate that the volume will be accessed via the block device API. */
export interface VolumeCapability_BlockVolume {
}

/** Indicate that the volume will be accessed via the filesystem API. */
export interface VolumeCapability_MountVolume {
  /**
   * The filesystem type. This field is OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  fsType: string;
  /**
   * The mount options that can be used for the volume. This field is
   * OPTIONAL. `mount_flags` MAY contain sensitive information.
   * Therefore, the CO and the Plugin MUST NOT leak this information
   * to untrusted entities. The total size of this repeated field
   * SHALL NOT exceed 4 KiB.
   */
  mountFlags: string[];
  /**
   * If SP has VOLUME_MOUNT_GROUP node capability and CO provides
   * this field then SP MUST ensure that the volume_mount_group
   * parameter is passed as the group identifier to the underlying
   * operating system mount system call, with the understanding
   * that the set of available mount call parameters and/or
   * mount implementations may vary across operating systems.
   * Additionally, new file and/or directory entries written to
   * the underlying filesystem SHOULD be permission-labeled in such a
   * manner, unless otherwise modified by a workload, that they are
   * both readable and writable by said mount group identifier.
   * This is an OPTIONAL field.
   */
  volumeMountGroup: string;
}

/** Specify how a volume can be accessed. */
export interface VolumeCapability_AccessMode {
  /** This field is REQUIRED. */
  mode: VolumeCapability_AccessMode_Mode;
}

export enum VolumeCapability_AccessMode_Mode {
  UNKNOWN = 0,
  /**
   * SINGLE_NODE_WRITER - Can only be published once as read/write on a single node, at
   * any given time.
   */
  SINGLE_NODE_WRITER = 1,
  /**
   * SINGLE_NODE_READER_ONLY - Can only be published once as readonly on a single node, at
   * any given time.
   */
  SINGLE_NODE_READER_ONLY = 2,
  /** MULTI_NODE_READER_ONLY - Can be published as readonly at multiple nodes simultaneously. */
  MULTI_NODE_READER_ONLY = 3,
  /**
   * MULTI_NODE_SINGLE_WRITER - Can be published at multiple nodes simultaneously. Only one of
   * the node can be used as read/write. The rest will be readonly.
   */
  MULTI_NODE_SINGLE_WRITER = 4,
  /**
   * MULTI_NODE_MULTI_WRITER - Can be published as read/write at multiple nodes
   * simultaneously.
   */
  MULTI_NODE_MULTI_WRITER = 5,
  /**
   * SINGLE_NODE_SINGLE_WRITER - Can only be published once as read/write at a single workload
   * on a single node, at any given time. SHOULD be used instead of
   * SINGLE_NODE_WRITER for COs using the experimental
   * SINGLE_NODE_MULTI_WRITER capability.
   */
  SINGLE_NODE_SINGLE_WRITER = 6,
  /**
   * SINGLE_NODE_MULTI_WRITER - Can be published as read/write at multiple workloads on a
   * single node simultaneously. SHOULD be used instead of
   * SINGLE_NODE_WRITER for COs using the experimental
   * SINGLE_NODE_MULTI_WRITER capability.
   */
  SINGLE_NODE_MULTI_WRITER = 7,
  UNRECOGNIZED = -1,
}

export function volumeCapability_AccessMode_ModeFromJSON(object: any): VolumeCapability_AccessMode_Mode {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return VolumeCapability_AccessMode_Mode.UNKNOWN;
    case 1:
    case "SINGLE_NODE_WRITER":
      return VolumeCapability_AccessMode_Mode.SINGLE_NODE_WRITER;
    case 2:
    case "SINGLE_NODE_READER_ONLY":
      return VolumeCapability_AccessMode_Mode.SINGLE_NODE_READER_ONLY;
    case 3:
    case "MULTI_NODE_READER_ONLY":
      return VolumeCapability_AccessMode_Mode.MULTI_NODE_READER_ONLY;
    case 4:
    case "MULTI_NODE_SINGLE_WRITER":
      return VolumeCapability_AccessMode_Mode.MULTI_NODE_SINGLE_WRITER;
    case 5:
    case "MULTI_NODE_MULTI_WRITER":
      return VolumeCapability_AccessMode_Mode.MULTI_NODE_MULTI_WRITER;
    case 6:
    case "SINGLE_NODE_SINGLE_WRITER":
      return VolumeCapability_AccessMode_Mode.SINGLE_NODE_SINGLE_WRITER;
    case 7:
    case "SINGLE_NODE_MULTI_WRITER":
      return VolumeCapability_AccessMode_Mode.SINGLE_NODE_MULTI_WRITER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VolumeCapability_AccessMode_Mode.UNRECOGNIZED;
  }
}

export function volumeCapability_AccessMode_ModeToJSON(object: VolumeCapability_AccessMode_Mode): string {
  switch (object) {
    case VolumeCapability_AccessMode_Mode.UNKNOWN:
      return "UNKNOWN";
    case VolumeCapability_AccessMode_Mode.SINGLE_NODE_WRITER:
      return "SINGLE_NODE_WRITER";
    case VolumeCapability_AccessMode_Mode.SINGLE_NODE_READER_ONLY:
      return "SINGLE_NODE_READER_ONLY";
    case VolumeCapability_AccessMode_Mode.MULTI_NODE_READER_ONLY:
      return "MULTI_NODE_READER_ONLY";
    case VolumeCapability_AccessMode_Mode.MULTI_NODE_SINGLE_WRITER:
      return "MULTI_NODE_SINGLE_WRITER";
    case VolumeCapability_AccessMode_Mode.MULTI_NODE_MULTI_WRITER:
      return "MULTI_NODE_MULTI_WRITER";
    case VolumeCapability_AccessMode_Mode.SINGLE_NODE_SINGLE_WRITER:
      return "SINGLE_NODE_SINGLE_WRITER";
    case VolumeCapability_AccessMode_Mode.SINGLE_NODE_MULTI_WRITER:
      return "SINGLE_NODE_MULTI_WRITER";
    case VolumeCapability_AccessMode_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The capacity of the storage space in bytes. To specify an exact size,
 * `required_bytes` and `limit_bytes` SHALL be set to the same value. At
 * least one of the these fields MUST be specified.
 */
export interface CapacityRange {
  /**
   * Volume MUST be at least this big. This field is OPTIONAL.
   * A value of 0 is equal to an unspecified field value.
   * The value of this field MUST NOT be negative.
   */
  requiredBytes: Long;
  /**
   * Volume MUST not be bigger than this. This field is OPTIONAL.
   * A value of 0 is equal to an unspecified field value.
   * The value of this field MUST NOT be negative.
   */
  limitBytes: Long;
}

/** Information about a specific volume. */
export interface Volume {
  /**
   * The capacity of the volume in bytes. This field is OPTIONAL. If not
   * set (value of 0), it indicates that the capacity of the volume is
   * unknown (e.g., NFS share).
   * The value of this field MUST NOT be negative.
   */
  capacityBytes: Long;
  /**
   * The identifier for this volume, generated by the plugin.
   * This field is REQUIRED.
   * This field MUST contain enough information to uniquely identify
   * this specific volume vs all other volumes supported by this plugin.
   * This field SHALL be used by the CO in subsequent calls to refer to
   * this volume.
   * The SP is NOT responsible for global uniqueness of volume_id across
   * multiple SPs.
   */
  volumeId: string;
  /**
   * Opaque static properties of the volume. SP MAY use this field to
   * ensure subsequent volume validation and publishing calls have
   * contextual information.
   * The contents of this field SHALL be opaque to a CO.
   * The contents of this field SHALL NOT be mutable.
   * The contents of this field SHALL be safe for the CO to cache.
   * The contents of this field SHOULD NOT contain sensitive
   * information.
   * The contents of this field SHOULD NOT be used for uniquely
   * identifying a volume. The `volume_id` alone SHOULD be sufficient to
   * identify the volume.
   * A volume uniquely identified by `volume_id` SHALL always report the
   * same volume_context.
   * This field is OPTIONAL and when present MUST be passed to volume
   * validation and publishing calls.
   */
  volumeContext: { [key: string]: string };
  /**
   * If specified, indicates that the volume is not empty and is
   * pre-populated with data from the specified source.
   * This field is OPTIONAL.
   */
  contentSource:
    | VolumeContentSource
    | undefined;
  /**
   * Specifies where (regions, zones, racks, etc.) the provisioned
   * volume is accessible from.
   * A plugin that returns this field MUST also set the
   * VOLUME_ACCESSIBILITY_CONSTRAINTS plugin capability.
   * An SP MAY specify multiple topologies to indicate the volume is
   * accessible from multiple locations.
   * COs MAY use this information along with the topology information
   * returned by NodeGetInfo to ensure that a given volume is accessible
   * from a given node when scheduling workloads.
   * This field is OPTIONAL. If it is not specified, the CO MAY assume
   * the volume is equally accessible from all nodes in the cluster and
   * MAY schedule workloads referencing the volume on any available
   * node.
   *
   * Example 1:
   *   accessible_topology = {"region": "R1", "zone": "Z2"}
   * Indicates a volume accessible only from the "region" "R1" and the
   * "zone" "Z2".
   *
   * Example 2:
   *   accessible_topology =
   *     {"region": "R1", "zone": "Z2"},
   *     {"region": "R1", "zone": "Z3"}
   * Indicates a volume accessible from both "zone" "Z2" and "zone" "Z3"
   * in the "region" "R1".
   */
  accessibleTopology: Topology[];
}

export interface Volume_VolumeContextEntry {
  key: string;
  value: string;
}

export interface TopologyRequirement {
  /**
   * Specifies the list of topologies the provisioned volume MUST be
   * accessible from.
   * This field is OPTIONAL. If TopologyRequirement is specified either
   * requisite or preferred or both MUST be specified.
   *
   * If requisite is specified, the provisioned volume MUST be
   * accessible from at least one of the requisite topologies.
   *
   * Given
   *   x = number of topologies provisioned volume is accessible from
   *   n = number of requisite topologies
   * The CO MUST ensure n >= 1. The SP MUST ensure x >= 1
   * If x==n, then the SP MUST make the provisioned volume available to
   * all topologies from the list of requisite topologies. If it is
   * unable to do so, the SP MUST fail the CreateVolume call.
   * For example, if a volume should be accessible from a single zone,
   * and requisite =
   *   {"region": "R1", "zone": "Z2"}
   * then the provisioned volume MUST be accessible from the "region"
   * "R1" and the "zone" "Z2".
   * Similarly, if a volume should be accessible from two zones, and
   * requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"}
   * then the provisioned volume MUST be accessible from the "region"
   * "R1" and both "zone" "Z2" and "zone" "Z3".
   *
   * If x<n, then the SP SHALL choose x unique topologies from the list
   * of requisite topologies. If it is unable to do so, the SP MUST fail
   * the CreateVolume call.
   * For example, if a volume should be accessible from a single zone,
   * and requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"}
   * then the SP may choose to make the provisioned volume available in
   * either the "zone" "Z2" or the "zone" "Z3" in the "region" "R1".
   * Similarly, if a volume should be accessible from two zones, and
   * requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"},
   *   {"region": "R1", "zone": "Z4"}
   * then the provisioned volume MUST be accessible from any combination
   * of two unique topologies: e.g. "R1/Z2" and "R1/Z3", or "R1/Z2" and
   *  "R1/Z4", or "R1/Z3" and "R1/Z4".
   *
   * If x>n, then the SP MUST make the provisioned volume available from
   * all topologies from the list of requisite topologies and MAY choose
   * the remaining x-n unique topologies from the list of all possible
   * topologies. If it is unable to do so, the SP MUST fail the
   * CreateVolume call.
   * For example, if a volume should be accessible from two zones, and
   * requisite =
   *   {"region": "R1", "zone": "Z2"}
   * then the provisioned volume MUST be accessible from the "region"
   * "R1" and the "zone" "Z2" and the SP may select the second zone
   * independently, e.g. "R1/Z4".
   */
  requisite: Topology[];
  /**
   * Specifies the list of topologies the CO would prefer the volume to
   * be provisioned in.
   *
   * This field is OPTIONAL. If TopologyRequirement is specified either
   * requisite or preferred or both MUST be specified.
   *
   * An SP MUST attempt to make the provisioned volume available using
   * the preferred topologies in order from first to last.
   *
   * If requisite is specified, all topologies in preferred list MUST
   * also be present in the list of requisite topologies.
   *
   * If the SP is unable to to make the provisioned volume available
   * from any of the preferred topologies, the SP MAY choose a topology
   * from the list of requisite topologies.
   * If the list of requisite topologies is not specified, then the SP
   * MAY choose from the list of all possible topologies.
   * If the list of requisite topologies is specified and the SP is
   * unable to to make the provisioned volume available from any of the
   * requisite topologies it MUST fail the CreateVolume call.
   *
   * Example 1:
   * Given a volume should be accessible from a single zone, and
   * requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"}
   * preferred =
   *   {"region": "R1", "zone": "Z3"}
   * then the SP SHOULD first attempt to make the provisioned volume
   * available from "zone" "Z3" in the "region" "R1" and fall back to
   * "zone" "Z2" in the "region" "R1" if that is not possible.
   *
   * Example 2:
   * Given a volume should be accessible from a single zone, and
   * requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"},
   *   {"region": "R1", "zone": "Z4"},
   *   {"region": "R1", "zone": "Z5"}
   * preferred =
   *   {"region": "R1", "zone": "Z4"},
   *   {"region": "R1", "zone": "Z2"}
   * then the SP SHOULD first attempt to make the provisioned volume
   * accessible from "zone" "Z4" in the "region" "R1" and fall back to
   * "zone" "Z2" in the "region" "R1" if that is not possible. If that
   * is not possible, the SP may choose between either the "zone"
   * "Z3" or "Z5" in the "region" "R1".
   *
   * Example 3:
   * Given a volume should be accessible from TWO zones (because an
   * opaque parameter in CreateVolumeRequest, for example, specifies
   * the volume is accessible from two zones, aka synchronously
   * replicated), and
   * requisite =
   *   {"region": "R1", "zone": "Z2"},
   *   {"region": "R1", "zone": "Z3"},
   *   {"region": "R1", "zone": "Z4"},
   *   {"region": "R1", "zone": "Z5"}
   * preferred =
   *   {"region": "R1", "zone": "Z5"},
   *   {"region": "R1", "zone": "Z3"}
   * then the SP SHOULD first attempt to make the provisioned volume
   * accessible from the combination of the two "zones" "Z5" and "Z3" in
   * the "region" "R1". If that's not possible, it should fall back to
   * a combination of "Z5" and other possibilities from the list of
   * requisite. If that's not possible, it should fall back  to a
   * combination of "Z3" and other possibilities from the list of
   * requisite. If that's not possible, it should fall back  to a
   * combination of other possibilities from the list of requisite.
   */
  preferred: Topology[];
}

/**
 * Topology is a map of topological domains to topological segments.
 * A topological domain is a sub-division of a cluster, like "region",
 * "zone", "rack", etc.
 * A topological segment is a specific instance of a topological domain,
 * like "zone3", "rack3", etc.
 * For example {"com.company/zone": "Z1", "com.company/rack": "R3"}
 * Valid keys have two segments: an OPTIONAL prefix and name, separated
 * by a slash (/), for example: "com.company.example/zone".
 * The key name segment is REQUIRED. The prefix is OPTIONAL.
 * The key name MUST be 63 characters or less, begin and end with an
 * alphanumeric character ([a-z0-9A-Z]), and contain only dashes (-),
 * underscores (_), dots (.), or alphanumerics in between, for example
 * "zone".
 * The key prefix MUST be 63 characters or less, begin and end with a
 * lower-case alphanumeric character ([a-z0-9]), contain only
 * dashes (-), dots (.), or lower-case alphanumerics in between, and
 * follow domain name notation format
 * (https://tools.ietf.org/html/rfc1035#section-2.3.1).
 * The key prefix SHOULD include the plugin's host company name and/or
 * the plugin name, to minimize the possibility of collisions with keys
 * from other plugins.
 * If a key prefix is specified, it MUST be identical across all
 * topology keys returned by the SP (across all RPCs).
 * Keys MUST be case-insensitive. Meaning the keys "Zone" and "zone"
 * MUST not both exist.
 * Each value (topological segment) MUST contain 1 or more strings.
 * Each string MUST be 63 characters or less and begin and end with an
 * alphanumeric character with '-', '_', '.', or alphanumerics in
 * between.
 */
export interface Topology {
  segments: { [key: string]: string };
}

export interface Topology_SegmentsEntry {
  key: string;
  value: string;
}

export interface DeleteVolumeRequest {
  /**
   * The ID of the volume to be deprovisioned.
   * This field is REQUIRED.
   */
  volumeId: string;
  /**
   * Secrets required by plugin to complete volume deletion request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface DeleteVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

/** Intentionally empty. */
export interface DeleteVolumeResponse {
}

export interface ControllerPublishVolumeRequest {
  /**
   * The ID of the volume to be used on a node.
   * This field is REQUIRED.
   */
  volumeId: string;
  /**
   * The ID of the node. This field is REQUIRED. The CO SHALL set this
   * field to match the node ID returned by `NodeGetInfo`.
   */
  nodeId: string;
  /**
   * Volume capability describing how the CO intends to use this volume.
   * SP MUST ensure the CO can use the published volume as described.
   * Otherwise SP MUST return the appropriate gRPC error code.
   * This is a REQUIRED field.
   */
  volumeCapability:
    | VolumeCapability
    | undefined;
  /**
   * Indicates SP MUST publish the volume in readonly mode.
   * CO MUST set this field to false if SP does not have the
   * PUBLISH_READONLY controller capability.
   * This is a REQUIRED field.
   */
  readonly: boolean;
  /**
   * Secrets required by plugin to complete controller publish volume
   * request. This field is OPTIONAL. Refer to the
   * `Secrets Requirements` section on how to use this field.
   */
  secrets: { [key: string]: string };
  /**
   * Volume context as returned by SP in
   * CreateVolumeResponse.Volume.volume_context.
   * This field is OPTIONAL and MUST match the volume_context of the
   * volume identified by `volume_id`.
   */
  volumeContext: { [key: string]: string };
}

export interface ControllerPublishVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface ControllerPublishVolumeRequest_VolumeContextEntry {
  key: string;
  value: string;
}

export interface ControllerPublishVolumeResponse {
  /**
   * Opaque static publish properties of the volume. SP MAY use this
   * field to ensure subsequent `NodeStageVolume` or `NodePublishVolume`
   * calls calls have contextual information.
   * The contents of this field SHALL be opaque to a CO.
   * The contents of this field SHALL NOT be mutable.
   * The contents of this field SHALL be safe for the CO to cache.
   * The contents of this field SHOULD NOT contain sensitive
   * information.
   * The contents of this field SHOULD NOT be used for uniquely
   * identifying a volume. The `volume_id` alone SHOULD be sufficient to
   * identify the volume.
   * This field is OPTIONAL and when present MUST be passed to
   * subsequent `NodeStageVolume` or `NodePublishVolume` calls
   */
  publishContext: { [key: string]: string };
}

export interface ControllerPublishVolumeResponse_PublishContextEntry {
  key: string;
  value: string;
}

export interface ControllerUnpublishVolumeRequest {
  /** The ID of the volume. This field is REQUIRED. */
  volumeId: string;
  /**
   * The ID of the node. This field is OPTIONAL. The CO SHOULD set this
   * field to match the node ID returned by `NodeGetInfo` or leave it
   * unset. If the value is set, the SP MUST unpublish the volume from
   * the specified node. If the value is unset, the SP MUST unpublish
   * the volume from all nodes it is published to.
   */
  nodeId: string;
  /**
   * Secrets required by plugin to complete controller unpublish volume
   * request. This SHOULD be the same secrets passed to the
   * ControllerPublishVolume call for the specified volume.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface ControllerUnpublishVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

/** Intentionally empty. */
export interface ControllerUnpublishVolumeResponse {
}

export interface ValidateVolumeCapabilitiesRequest {
  /** The ID of the volume to check. This field is REQUIRED. */
  volumeId: string;
  /**
   * Volume context as returned by SP in
   * CreateVolumeResponse.Volume.volume_context.
   * This field is OPTIONAL and MUST match the volume_context of the
   * volume identified by `volume_id`.
   */
  volumeContext: { [key: string]: string };
  /**
   * The capabilities that the CO wants to check for the volume. This
   * call SHALL return "confirmed" only if all the volume capabilities
   * specified below are supported. This field is REQUIRED.
   */
  volumeCapabilities: VolumeCapability[];
  /**
   * See CreateVolumeRequest.parameters.
   * This field is OPTIONAL.
   */
  parameters: { [key: string]: string };
  /**
   * Secrets required by plugin to complete volume validation request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
  key: string;
  value: string;
}

export interface ValidateVolumeCapabilitiesRequest_ParametersEntry {
  key: string;
  value: string;
}

export interface ValidateVolumeCapabilitiesRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface ValidateVolumeCapabilitiesResponse {
  /**
   * Confirmed indicates to the CO the set of capabilities that the
   * plugin has validated. This field SHALL only be set to a non-empty
   * value for successful validation responses.
   * For successful validation responses, the CO SHALL compare the
   * fields of this message to the originally requested capabilities in
   * order to guard against an older plugin reporting "valid" for newer
   * capability fields that it does not yet understand.
   * This field is OPTIONAL.
   */
  confirmed:
    | ValidateVolumeCapabilitiesResponse_Confirmed
    | undefined;
  /**
   * Message to the CO if `confirmed` above is empty. This field is
   * OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  message: string;
}

export interface ValidateVolumeCapabilitiesResponse_Confirmed {
  /**
   * Volume context validated by the plugin.
   * This field is OPTIONAL.
   */
  volumeContext: { [key: string]: string };
  /**
   * Volume capabilities supported by the plugin.
   * This field is REQUIRED.
   */
  volumeCapabilities: VolumeCapability[];
  /**
   * The volume creation parameters validated by the plugin.
   * This field is OPTIONAL.
   */
  parameters: { [key: string]: string };
}

export interface ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
  key: string;
  value: string;
}

export interface ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
  key: string;
  value: string;
}

export interface ListVolumesRequest {
  /**
   * If specified (non-zero value), the Plugin MUST NOT return more
   * entries than this number in the response. If the actual number of
   * entries is more than this number, the Plugin MUST set `next_token`
   * in the response which can be used to get the next page of entries
   * in the subsequent `ListVolumes` call. This field is OPTIONAL. If
   * not specified (zero value), it means there is no restriction on the
   * number of entries that can be returned.
   * The value of this field MUST NOT be negative.
   */
  maxEntries: number;
  /**
   * A token to specify where to start paginating. Set this field to
   * `next_token` returned by a previous `ListVolumes` call to get the
   * next page of entries. This field is OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  startingToken: string;
}

export interface ListVolumesResponse {
  entries: ListVolumesResponse_Entry[];
  /**
   * This token allows you to get the next page of entries for
   * `ListVolumes` request. If the number of entries is larger than
   * `max_entries`, use the `next_token` as a value for the
   * `starting_token` field in the next `ListVolumes` request. This
   * field is OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  nextToken: string;
}

export interface ListVolumesResponse_VolumeStatus {
  /**
   * A list of all `node_id` of nodes that the volume in this entry
   * is controller published on.
   * This field is OPTIONAL. If it is not specified and the SP has
   * the LIST_VOLUMES_PUBLISHED_NODES controller capability, the CO
   * MAY assume the volume is not controller published to any nodes.
   * If the field is not specified and the SP does not have the
   * LIST_VOLUMES_PUBLISHED_NODES controller capability, the CO MUST
   * not interpret this field.
   * published_node_ids MAY include nodes not published to or
   * reported by the SP. The CO MUST be resilient to that.
   */
  publishedNodeIds: string[];
  /**
   * Information about the current condition of the volume.
   * This field is OPTIONAL.
   * This field MUST be specified if the
   * VOLUME_CONDITION controller capability is supported.
   */
  volumeCondition: VolumeCondition | undefined;
}

export interface ListVolumesResponse_Entry {
  /** This field is REQUIRED */
  volume:
    | Volume
    | undefined;
  /**
   * This field is OPTIONAL. This field MUST be specified if the
   * LIST_VOLUMES_PUBLISHED_NODES controller capability is
   * supported.
   */
  status: ListVolumesResponse_VolumeStatus | undefined;
}

export interface ControllerGetVolumeRequest {
  /**
   * The ID of the volume to fetch current volume information for.
   * This field is REQUIRED.
   */
  volumeId: string;
}

export interface ControllerGetVolumeResponse {
  /** This field is REQUIRED */
  volume:
    | Volume
    | undefined;
  /** This field is REQUIRED. */
  status: ControllerGetVolumeResponse_VolumeStatus | undefined;
}

export interface ControllerGetVolumeResponse_VolumeStatus {
  /**
   * A list of all the `node_id` of nodes that this volume is
   * controller published on.
   * This field is OPTIONAL.
   * This field MUST be specified if the LIST_VOLUMES_PUBLISHED_NODES
   * controller capability is supported.
   * published_node_ids MAY include nodes not published to or
   * reported by the SP. The CO MUST be resilient to that.
   */
  publishedNodeIds: string[];
  /**
   * Information about the current condition of the volume.
   * This field is OPTIONAL.
   * This field MUST be specified if the
   * VOLUME_CONDITION controller capability is supported.
   */
  volumeCondition: VolumeCondition | undefined;
}

export interface GetCapacityRequest {
  /**
   * If specified, the Plugin SHALL report the capacity of the storage
   * that can be used to provision volumes that satisfy ALL of the
   * specified `volume_capabilities`. These are the same
   * `volume_capabilities` the CO will use in `CreateVolumeRequest`.
   * This field is OPTIONAL.
   */
  volumeCapabilities: VolumeCapability[];
  /**
   * If specified, the Plugin SHALL report the capacity of the storage
   * that can be used to provision volumes with the given Plugin
   * specific `parameters`. These are the same `parameters` the CO will
   * use in `CreateVolumeRequest`. This field is OPTIONAL.
   */
  parameters: { [key: string]: string };
  /**
   * If specified, the Plugin SHALL report the capacity of the storage
   * that can be used to provision volumes that in the specified
   * `accessible_topology`. This is the same as the
   * `accessible_topology` the CO returns in a `CreateVolumeResponse`.
   * This field is OPTIONAL. This field SHALL NOT be set unless the
   * plugin advertises the VOLUME_ACCESSIBILITY_CONSTRAINTS capability.
   */
  accessibleTopology: Topology | undefined;
}

export interface GetCapacityRequest_ParametersEntry {
  key: string;
  value: string;
}

export interface GetCapacityResponse {
  /**
   * The available capacity, in bytes, of the storage that can be used
   * to provision volumes. If `volume_capabilities` or `parameters` is
   * specified in the request, the Plugin SHALL take those into
   * consideration when calculating the available capacity of the
   * storage. This field is REQUIRED.
   * The value of this field MUST NOT be negative.
   */
  availableCapacity: Long;
  /**
   * The largest size that may be used in a
   * CreateVolumeRequest.capacity_range.required_bytes field
   * to create a volume with the same parameters as those in
   * GetCapacityRequest.
   *
   * If `volume_capabilities` or `parameters` is
   * specified in the request, the Plugin SHALL take those into
   * consideration when calculating the minimum volume size of the
   * storage.
   *
   * This field is OPTIONAL. MUST NOT be negative.
   * The Plugin SHOULD provide a value for this field if it has
   * a maximum size for individual volumes and leave it unset
   * otherwise. COs MAY use it to make decision about
   * where to create volumes.
   */
  maximumVolumeSize:
    | Long
    | undefined;
  /**
   * The smallest size that may be used in a
   * CreateVolumeRequest.capacity_range.limit_bytes field
   * to create a volume with the same parameters as those in
   * GetCapacityRequest.
   *
   * If `volume_capabilities` or `parameters` is
   * specified in the request, the Plugin SHALL take those into
   * consideration when calculating the maximum volume size of the
   * storage.
   *
   * This field is OPTIONAL. MUST NOT be negative.
   * The Plugin SHOULD provide a value for this field if it has
   * a minimum size for individual volumes and leave it unset
   * otherwise. COs MAY use it to make decision about
   * where to create volumes.
   */
  minimumVolumeSize: Long | undefined;
}

/** Intentionally empty. */
export interface ControllerGetCapabilitiesRequest {
}

export interface ControllerGetCapabilitiesResponse {
  /**
   * All the capabilities that the controller service supports. This
   * field is OPTIONAL.
   */
  capabilities: ControllerServiceCapability[];
}

/** Specifies a capability of the controller service. */
export interface ControllerServiceCapability {
  type?: { $case: "rpc"; rpc: ControllerServiceCapability_RPC };
}

export interface ControllerServiceCapability_RPC {
  type: ControllerServiceCapability_RPC_Type;
}

export enum ControllerServiceCapability_RPC_Type {
  UNKNOWN = 0,
  CREATE_DELETE_VOLUME = 1,
  PUBLISH_UNPUBLISH_VOLUME = 2,
  LIST_VOLUMES = 3,
  GET_CAPACITY = 4,
  /**
   * CREATE_DELETE_SNAPSHOT - Currently the only way to consume a snapshot is to create
   * a volume from it. Therefore plugins supporting
   * CREATE_DELETE_SNAPSHOT MUST support creating volume from
   * snapshot.
   */
  CREATE_DELETE_SNAPSHOT = 5,
  LIST_SNAPSHOTS = 6,
  /**
   * CLONE_VOLUME - Plugins supporting volume cloning at the storage level MAY
   * report this capability. The source volume MUST be managed by
   * the same plugin. Not all volume sources and parameters
   * combinations MAY work.
   */
  CLONE_VOLUME = 7,
  /**
   * PUBLISH_READONLY - Indicates the SP supports ControllerPublishVolume.readonly
   * field.
   */
  PUBLISH_READONLY = 8,
  /** EXPAND_VOLUME - See VolumeExpansion for details. */
  EXPAND_VOLUME = 9,
  /**
   * LIST_VOLUMES_PUBLISHED_NODES - Indicates the SP supports the
   * ListVolumesResponse.entry.published_node_ids field and the
   * ControllerGetVolumeResponse.published_node_ids field.
   * The SP MUST also support PUBLISH_UNPUBLISH_VOLUME.
   */
  LIST_VOLUMES_PUBLISHED_NODES = 10,
  /**
   * VOLUME_CONDITION - Indicates that the Controller service can report volume
   * conditions.
   * An SP MAY implement `VolumeCondition` in only the Controller
   * Plugin, only the Node Plugin, or both.
   * If `VolumeCondition` is implemented in both the Controller and
   * Node Plugins, it SHALL report from different perspectives.
   * If for some reason Controller and Node Plugins report
   * misaligned volume conditions, CO SHALL assume the worst case
   * is the truth.
   * Note that, for alpha, `VolumeCondition` is intended be
   * informative for humans only, not for automation.
   */
  VOLUME_CONDITION = 11,
  /**
   * GET_VOLUME - Indicates the SP supports the ControllerGetVolume RPC.
   * This enables COs to, for example, fetch per volume
   * condition after a volume is provisioned.
   */
  GET_VOLUME = 12,
  /**
   * SINGLE_NODE_MULTI_WRITER - Indicates the SP supports the SINGLE_NODE_SINGLE_WRITER and/or
   * SINGLE_NODE_MULTI_WRITER access modes.
   * These access modes are intended to replace the
   * SINGLE_NODE_WRITER access mode to clarify the number of writers
   * for a volume on a single node. Plugins MUST accept and allow
   * use of the SINGLE_NODE_WRITER access mode when either
   * SINGLE_NODE_SINGLE_WRITER and/or SINGLE_NODE_MULTI_WRITER are
   * supported, in order to permit older COs to continue working.
   */
  SINGLE_NODE_MULTI_WRITER = 13,
  UNRECOGNIZED = -1,
}

export function controllerServiceCapability_RPC_TypeFromJSON(object: any): ControllerServiceCapability_RPC_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ControllerServiceCapability_RPC_Type.UNKNOWN;
    case 1:
    case "CREATE_DELETE_VOLUME":
      return ControllerServiceCapability_RPC_Type.CREATE_DELETE_VOLUME;
    case 2:
    case "PUBLISH_UNPUBLISH_VOLUME":
      return ControllerServiceCapability_RPC_Type.PUBLISH_UNPUBLISH_VOLUME;
    case 3:
    case "LIST_VOLUMES":
      return ControllerServiceCapability_RPC_Type.LIST_VOLUMES;
    case 4:
    case "GET_CAPACITY":
      return ControllerServiceCapability_RPC_Type.GET_CAPACITY;
    case 5:
    case "CREATE_DELETE_SNAPSHOT":
      return ControllerServiceCapability_RPC_Type.CREATE_DELETE_SNAPSHOT;
    case 6:
    case "LIST_SNAPSHOTS":
      return ControllerServiceCapability_RPC_Type.LIST_SNAPSHOTS;
    case 7:
    case "CLONE_VOLUME":
      return ControllerServiceCapability_RPC_Type.CLONE_VOLUME;
    case 8:
    case "PUBLISH_READONLY":
      return ControllerServiceCapability_RPC_Type.PUBLISH_READONLY;
    case 9:
    case "EXPAND_VOLUME":
      return ControllerServiceCapability_RPC_Type.EXPAND_VOLUME;
    case 10:
    case "LIST_VOLUMES_PUBLISHED_NODES":
      return ControllerServiceCapability_RPC_Type.LIST_VOLUMES_PUBLISHED_NODES;
    case 11:
    case "VOLUME_CONDITION":
      return ControllerServiceCapability_RPC_Type.VOLUME_CONDITION;
    case 12:
    case "GET_VOLUME":
      return ControllerServiceCapability_RPC_Type.GET_VOLUME;
    case 13:
    case "SINGLE_NODE_MULTI_WRITER":
      return ControllerServiceCapability_RPC_Type.SINGLE_NODE_MULTI_WRITER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ControllerServiceCapability_RPC_Type.UNRECOGNIZED;
  }
}

export function controllerServiceCapability_RPC_TypeToJSON(object: ControllerServiceCapability_RPC_Type): string {
  switch (object) {
    case ControllerServiceCapability_RPC_Type.UNKNOWN:
      return "UNKNOWN";
    case ControllerServiceCapability_RPC_Type.CREATE_DELETE_VOLUME:
      return "CREATE_DELETE_VOLUME";
    case ControllerServiceCapability_RPC_Type.PUBLISH_UNPUBLISH_VOLUME:
      return "PUBLISH_UNPUBLISH_VOLUME";
    case ControllerServiceCapability_RPC_Type.LIST_VOLUMES:
      return "LIST_VOLUMES";
    case ControllerServiceCapability_RPC_Type.GET_CAPACITY:
      return "GET_CAPACITY";
    case ControllerServiceCapability_RPC_Type.CREATE_DELETE_SNAPSHOT:
      return "CREATE_DELETE_SNAPSHOT";
    case ControllerServiceCapability_RPC_Type.LIST_SNAPSHOTS:
      return "LIST_SNAPSHOTS";
    case ControllerServiceCapability_RPC_Type.CLONE_VOLUME:
      return "CLONE_VOLUME";
    case ControllerServiceCapability_RPC_Type.PUBLISH_READONLY:
      return "PUBLISH_READONLY";
    case ControllerServiceCapability_RPC_Type.EXPAND_VOLUME:
      return "EXPAND_VOLUME";
    case ControllerServiceCapability_RPC_Type.LIST_VOLUMES_PUBLISHED_NODES:
      return "LIST_VOLUMES_PUBLISHED_NODES";
    case ControllerServiceCapability_RPC_Type.VOLUME_CONDITION:
      return "VOLUME_CONDITION";
    case ControllerServiceCapability_RPC_Type.GET_VOLUME:
      return "GET_VOLUME";
    case ControllerServiceCapability_RPC_Type.SINGLE_NODE_MULTI_WRITER:
      return "SINGLE_NODE_MULTI_WRITER";
    case ControllerServiceCapability_RPC_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateSnapshotRequest {
  /**
   * The ID of the source volume to be snapshotted.
   * This field is REQUIRED.
   */
  sourceVolumeId: string;
  /**
   * The suggested name for the snapshot. This field is REQUIRED for
   * idempotency.
   * Any Unicode string that conforms to the length limit is allowed
   * except those containing the following banned characters:
   * U+0000-U+0008, U+000B, U+000C, U+000E-U+001F, U+007F-U+009F.
   * (These are control characters other than commonly used whitespace.)
   */
  name: string;
  /**
   * Secrets required by plugin to complete snapshot creation request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
  /**
   * Plugin specific parameters passed in as opaque key-value pairs.
   * This field is OPTIONAL. The Plugin is responsible for parsing and
   * validating these parameters. COs will treat these as opaque.
   * Use cases for opaque parameters:
   * - Specify a policy to automatically clean up the snapshot.
   * - Specify an expiration date for the snapshot.
   * - Specify whether the snapshot is readonly or read/write.
   * - Specify if the snapshot should be replicated to some place.
   * - Specify primary or secondary for replication systems that
   *   support snapshotting only on primary.
   */
  parameters: { [key: string]: string };
}

export interface CreateSnapshotRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface CreateSnapshotRequest_ParametersEntry {
  key: string;
  value: string;
}

export interface CreateSnapshotResponse {
  /**
   * Contains all attributes of the newly created snapshot that are
   * relevant to the CO along with information required by the Plugin
   * to uniquely identify the snapshot. This field is REQUIRED.
   */
  snapshot: Snapshot | undefined;
}

/** Information about a specific snapshot. */
export interface Snapshot {
  /**
   * This is the complete size of the snapshot in bytes. The purpose of
   * this field is to give CO guidance on how much space is needed to
   * create a volume from this snapshot. The size of the volume MUST NOT
   * be less than the size of the source snapshot. This field is
   * OPTIONAL. If this field is not set, it indicates that this size is
   * unknown. The value of this field MUST NOT be negative and a size of
   * zero means it is unspecified.
   */
  sizeBytes: Long;
  /**
   * The identifier for this snapshot, generated by the plugin.
   * This field is REQUIRED.
   * This field MUST contain enough information to uniquely identify
   * this specific snapshot vs all other snapshots supported by this
   * plugin.
   * This field SHALL be used by the CO in subsequent calls to refer to
   * this snapshot.
   * The SP is NOT responsible for global uniqueness of snapshot_id
   * across multiple SPs.
   */
  snapshotId: string;
  /**
   * Identity information for the source volume. Note that creating a
   * snapshot from a snapshot is not supported here so the source has to
   * be a volume. This field is REQUIRED.
   */
  sourceVolumeId: string;
  /**
   * Timestamp when the point-in-time snapshot is taken on the storage
   * system. This field is REQUIRED.
   */
  creationTime:
    | Date
    | undefined;
  /**
   * Indicates if a snapshot is ready to use as a
   * `volume_content_source` in a `CreateVolumeRequest`. The default
   * value is false. This field is REQUIRED.
   */
  readyToUse: boolean;
  /**
   * The ID of the volume group snapshot that this snapshot is part of.
   * It uniquely identifies the group snapshot on the storage system.
   * This field is OPTIONAL.
   * If this snapshot is a member of a volume group snapshot, and it
   * MUST NOT be deleted as a stand alone snapshot, then the SP
   * MUST provide the ID of the volume group snapshot in this field.
   * If provided, CO MUST use this field in subsequent volume group
   * snapshot operations to indicate that this snapshot is part of the
   * specified group snapshot.
   * If not provided, CO SHALL treat the snapshot as independent,
   * and SP SHALL allow it to be deleted separately.
   * If this message is inside a VolumeGroupSnapshot message, the value
   * MUST be the same as the group_snapshot_id in that message.
   */
  groupSnapshotId: string;
}

export interface DeleteSnapshotRequest {
  /**
   * The ID of the snapshot to be deleted.
   * This field is REQUIRED.
   */
  snapshotId: string;
  /**
   * Secrets required by plugin to complete snapshot deletion request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface DeleteSnapshotRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface DeleteSnapshotResponse {
}

/**
 * List all snapshots on the storage system regardless of how they were
 * created.
 */
export interface ListSnapshotsRequest {
  /**
   * If specified (non-zero value), the Plugin MUST NOT return more
   * entries than this number in the response. If the actual number of
   * entries is more than this number, the Plugin MUST set `next_token`
   * in the response which can be used to get the next page of entries
   * in the subsequent `ListSnapshots` call. This field is OPTIONAL. If
   * not specified (zero value), it means there is no restriction on the
   * number of entries that can be returned.
   * The value of this field MUST NOT be negative.
   */
  maxEntries: number;
  /**
   * A token to specify where to start paginating. Set this field to
   * `next_token` returned by a previous `ListSnapshots` call to get the
   * next page of entries. This field is OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  startingToken: string;
  /**
   * Identity information for the source volume. This field is OPTIONAL.
   * It can be used to list snapshots by volume.
   */
  sourceVolumeId: string;
  /**
   * Identity information for a specific snapshot. This field is
   * OPTIONAL. It can be used to list only a specific snapshot.
   * ListSnapshots will return with current snapshot information
   * and will not block if the snapshot is being processed after
   * it is cut.
   */
  snapshotId: string;
  /**
   * Secrets required by plugin to complete ListSnapshot request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface ListSnapshotsRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface ListSnapshotsResponse {
  entries: ListSnapshotsResponse_Entry[];
  /**
   * This token allows you to get the next page of entries for
   * `ListSnapshots` request. If the number of entries is larger than
   * `max_entries`, use the `next_token` as a value for the
   * `starting_token` field in the next `ListSnapshots` request. This
   * field is OPTIONAL.
   * An empty string is equal to an unspecified field value.
   */
  nextToken: string;
}

export interface ListSnapshotsResponse_Entry {
  snapshot: Snapshot | undefined;
}

export interface ControllerExpandVolumeRequest {
  /** The ID of the volume to expand. This field is REQUIRED. */
  volumeId: string;
  /**
   * This allows CO to specify the capacity requirements of the volume
   * after expansion. This field is REQUIRED.
   */
  capacityRange:
    | CapacityRange
    | undefined;
  /**
   * Secrets required by the plugin for expanding the volume.
   * This field is OPTIONAL.
   */
  secrets: { [key: string]: string };
  /**
   * Volume capability describing how the CO intends to use this volume.
   * This allows SP to determine if volume is being used as a block
   * device or mounted file system. For example - if volume is
   * being used as a block device - the SP MAY set
   * node_expansion_required to false in ControllerExpandVolumeResponse
   * to skip invocation of NodeExpandVolume on the node by the CO.
   * This is an OPTIONAL field.
   */
  volumeCapability: VolumeCapability | undefined;
}

export interface ControllerExpandVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface ControllerExpandVolumeResponse {
  /** Capacity of volume after expansion. This field is REQUIRED. */
  capacityBytes: Long;
  /**
   * Whether node expansion is required for the volume. When true
   * the CO MUST make NodeExpandVolume RPC call on the node. This field
   * is REQUIRED.
   */
  nodeExpansionRequired: boolean;
}

export interface NodeStageVolumeRequest {
  /** The ID of the volume to publish. This field is REQUIRED. */
  volumeId: string;
  /**
   * The CO SHALL set this field to the value returned by
   * `ControllerPublishVolume` if the corresponding Controller Plugin
   * has `PUBLISH_UNPUBLISH_VOLUME` controller capability, and SHALL be
   * left unset if the corresponding Controller Plugin does not have
   * this capability. This is an OPTIONAL field.
   */
  publishContext: { [key: string]: string };
  /**
   * The path to which the volume MAY be staged. It MUST be an
   * absolute path in the root filesystem of the process serving this
   * request, and MUST be a directory. The CO SHALL ensure that there
   * is only one `staging_target_path` per volume. The CO SHALL ensure
   * that the path is directory and that the process serving the
   * request has `read` and `write` permission to that directory. The
   * CO SHALL be responsible for creating the directory if it does not
   * exist.
   * This is a REQUIRED field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  stagingTargetPath: string;
  /**
   * Volume capability describing how the CO intends to use this volume.
   * SP MUST ensure the CO can use the staged volume as described.
   * Otherwise SP MUST return the appropriate gRPC error code.
   * This is a REQUIRED field.
   */
  volumeCapability:
    | VolumeCapability
    | undefined;
  /**
   * Secrets required by plugin to complete node stage volume request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
  /**
   * Volume context as returned by SP in
   * CreateVolumeResponse.Volume.volume_context.
   * This field is OPTIONAL and MUST match the volume_context of the
   * volume identified by `volume_id`.
   */
  volumeContext: { [key: string]: string };
}

export interface NodeStageVolumeRequest_PublishContextEntry {
  key: string;
  value: string;
}

export interface NodeStageVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface NodeStageVolumeRequest_VolumeContextEntry {
  key: string;
  value: string;
}

/** Intentionally empty. */
export interface NodeStageVolumeResponse {
}

export interface NodeUnstageVolumeRequest {
  /** The ID of the volume. This field is REQUIRED. */
  volumeId: string;
  /**
   * The path at which the volume was staged. It MUST be an absolute
   * path in the root filesystem of the process serving this request.
   * This is a REQUIRED field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  stagingTargetPath: string;
}

/** Intentionally empty. */
export interface NodeUnstageVolumeResponse {
}

export interface NodePublishVolumeRequest {
  /** The ID of the volume to publish. This field is REQUIRED. */
  volumeId: string;
  /**
   * The CO SHALL set this field to the value returned by
   * `ControllerPublishVolume` if the corresponding Controller Plugin
   * has `PUBLISH_UNPUBLISH_VOLUME` controller capability, and SHALL be
   * left unset if the corresponding Controller Plugin does not have
   * this capability. This is an OPTIONAL field.
   */
  publishContext: { [key: string]: string };
  /**
   * The path to which the volume was staged by `NodeStageVolume`.
   * It MUST be an absolute path in the root filesystem of the process
   * serving this request.
   * It MUST be set if the Node Plugin implements the
   * `STAGE_UNSTAGE_VOLUME` node capability.
   * This is an OPTIONAL field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  stagingTargetPath: string;
  /**
   * The path to which the volume will be published. It MUST be an
   * absolute path in the root filesystem of the process serving this
   * request. The CO SHALL ensure uniqueness of target_path per volume.
   * The CO SHALL ensure that the parent directory of this path exists
   * and that the process serving the request has `read` and `write`
   * permissions to that parent directory.
   * For volumes with an access type of block, the SP SHALL place the
   * block device at target_path.
   * For volumes with an access type of mount, the SP SHALL place the
   * mounted directory at target_path.
   * Creation of target_path is the responsibility of the SP.
   * This is a REQUIRED field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  targetPath: string;
  /**
   * Volume capability describing how the CO intends to use this volume.
   * SP MUST ensure the CO can use the published volume as described.
   * Otherwise SP MUST return the appropriate gRPC error code.
   * This is a REQUIRED field.
   */
  volumeCapability:
    | VolumeCapability
    | undefined;
  /**
   * Indicates SP MUST publish the volume in readonly mode.
   * This field is REQUIRED.
   */
  readonly: boolean;
  /**
   * Secrets required by plugin to complete node publish volume request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
  /**
   * Volume context as returned by SP in
   * CreateVolumeResponse.Volume.volume_context.
   * This field is OPTIONAL and MUST match the volume_context of the
   * volume identified by `volume_id`.
   */
  volumeContext: { [key: string]: string };
}

export interface NodePublishVolumeRequest_PublishContextEntry {
  key: string;
  value: string;
}

export interface NodePublishVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface NodePublishVolumeRequest_VolumeContextEntry {
  key: string;
  value: string;
}

/** Intentionally empty. */
export interface NodePublishVolumeResponse {
}

export interface NodeUnpublishVolumeRequest {
  /** The ID of the volume. This field is REQUIRED. */
  volumeId: string;
  /**
   * The path at which the volume was published. It MUST be an absolute
   * path in the root filesystem of the process serving this request.
   * The SP MUST delete the file or directory it created at this path.
   * This is a REQUIRED field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  targetPath: string;
}

/** Intentionally empty. */
export interface NodeUnpublishVolumeResponse {
}

export interface NodeGetVolumeStatsRequest {
  /** The ID of the volume. This field is REQUIRED. */
  volumeId: string;
  /**
   * It can be any valid path where volume was previously
   * staged or published.
   * It MUST be an absolute path in the root filesystem of
   * the process serving this request.
   * This is a REQUIRED field.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  volumePath: string;
  /**
   * The path where the volume is staged, if the plugin has the
   * STAGE_UNSTAGE_VOLUME capability, otherwise empty.
   * If not empty, it MUST be an absolute path in the root
   * filesystem of the process serving this request.
   * This field is OPTIONAL.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  stagingTargetPath: string;
}

export interface NodeGetVolumeStatsResponse {
  /** This field is OPTIONAL. */
  usage: VolumeUsage[];
  /**
   * Information about the current condition of the volume.
   * This field is OPTIONAL.
   * This field MUST be specified if the VOLUME_CONDITION node
   * capability is supported.
   */
  volumeCondition: VolumeCondition | undefined;
}

export interface VolumeUsage {
  /**
   * The available capacity in specified Unit. This field is OPTIONAL.
   * The value of this field MUST NOT be negative.
   */
  available: Long;
  /**
   * The total capacity in specified Unit. This field is REQUIRED.
   * The value of this field MUST NOT be negative.
   */
  total: Long;
  /**
   * The used capacity in specified Unit. This field is OPTIONAL.
   * The value of this field MUST NOT be negative.
   */
  used: Long;
  /** Units by which values are measured. This field is REQUIRED. */
  unit: VolumeUsage_Unit;
}

export enum VolumeUsage_Unit {
  UNKNOWN = 0,
  BYTES = 1,
  INODES = 2,
  UNRECOGNIZED = -1,
}

export function volumeUsage_UnitFromJSON(object: any): VolumeUsage_Unit {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return VolumeUsage_Unit.UNKNOWN;
    case 1:
    case "BYTES":
      return VolumeUsage_Unit.BYTES;
    case 2:
    case "INODES":
      return VolumeUsage_Unit.INODES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VolumeUsage_Unit.UNRECOGNIZED;
  }
}

export function volumeUsage_UnitToJSON(object: VolumeUsage_Unit): string {
  switch (object) {
    case VolumeUsage_Unit.UNKNOWN:
      return "UNKNOWN";
    case VolumeUsage_Unit.BYTES:
      return "BYTES";
    case VolumeUsage_Unit.INODES:
      return "INODES";
    case VolumeUsage_Unit.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** VolumeCondition represents the current condition of a volume. */
export interface VolumeCondition {
  /**
   * Normal volumes are available for use and operating optimally.
   * An abnormal volume does not meet these criteria.
   * This field is REQUIRED.
   */
  abnormal: boolean;
  /**
   * The message describing the condition of the volume.
   * This field is REQUIRED.
   */
  message: string;
}

/** Intentionally empty. */
export interface NodeGetCapabilitiesRequest {
}

export interface NodeGetCapabilitiesResponse {
  /**
   * All the capabilities that the node service supports. This field
   * is OPTIONAL.
   */
  capabilities: NodeServiceCapability[];
}

/** Specifies a capability of the node service. */
export interface NodeServiceCapability {
  type?: { $case: "rpc"; rpc: NodeServiceCapability_RPC };
}

export interface NodeServiceCapability_RPC {
  type: NodeServiceCapability_RPC_Type;
}

export enum NodeServiceCapability_RPC_Type {
  UNKNOWN = 0,
  STAGE_UNSTAGE_VOLUME = 1,
  /**
   * GET_VOLUME_STATS - If Plugin implements GET_VOLUME_STATS capability
   * then it MUST implement NodeGetVolumeStats RPC
   * call for fetching volume statistics.
   */
  GET_VOLUME_STATS = 2,
  /** EXPAND_VOLUME - See VolumeExpansion for details. */
  EXPAND_VOLUME = 3,
  /**
   * VOLUME_CONDITION - Indicates that the Node service can report volume conditions.
   * An SP MAY implement `VolumeCondition` in only the Node
   * Plugin, only the Controller Plugin, or both.
   * If `VolumeCondition` is implemented in both the Node and
   * Controller Plugins, it SHALL report from different
   * perspectives.
   * If for some reason Node and Controller Plugins report
   * misaligned volume conditions, CO SHALL assume the worst case
   * is the truth.
   * Note that, for alpha, `VolumeCondition` is intended to be
   * informative for humans only, not for automation.
   */
  VOLUME_CONDITION = 4,
  /**
   * SINGLE_NODE_MULTI_WRITER - Indicates the SP supports the SINGLE_NODE_SINGLE_WRITER and/or
   * SINGLE_NODE_MULTI_WRITER access modes.
   * These access modes are intended to replace the
   * SINGLE_NODE_WRITER access mode to clarify the number of writers
   * for a volume on a single node. Plugins MUST accept and allow
   * use of the SINGLE_NODE_WRITER access mode (subject to the
   * processing rules for NodePublishVolume), when either
   * SINGLE_NODE_SINGLE_WRITER and/or SINGLE_NODE_MULTI_WRITER are
   * supported, in order to permit older COs to continue working.
   */
  SINGLE_NODE_MULTI_WRITER = 5,
  /**
   * VOLUME_MOUNT_GROUP - Indicates that Node service supports mounting volumes
   * with provided volume group identifier during node stage
   * or node publish RPC calls.
   */
  VOLUME_MOUNT_GROUP = 6,
  UNRECOGNIZED = -1,
}

export function nodeServiceCapability_RPC_TypeFromJSON(object: any): NodeServiceCapability_RPC_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return NodeServiceCapability_RPC_Type.UNKNOWN;
    case 1:
    case "STAGE_UNSTAGE_VOLUME":
      return NodeServiceCapability_RPC_Type.STAGE_UNSTAGE_VOLUME;
    case 2:
    case "GET_VOLUME_STATS":
      return NodeServiceCapability_RPC_Type.GET_VOLUME_STATS;
    case 3:
    case "EXPAND_VOLUME":
      return NodeServiceCapability_RPC_Type.EXPAND_VOLUME;
    case 4:
    case "VOLUME_CONDITION":
      return NodeServiceCapability_RPC_Type.VOLUME_CONDITION;
    case 5:
    case "SINGLE_NODE_MULTI_WRITER":
      return NodeServiceCapability_RPC_Type.SINGLE_NODE_MULTI_WRITER;
    case 6:
    case "VOLUME_MOUNT_GROUP":
      return NodeServiceCapability_RPC_Type.VOLUME_MOUNT_GROUP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NodeServiceCapability_RPC_Type.UNRECOGNIZED;
  }
}

export function nodeServiceCapability_RPC_TypeToJSON(object: NodeServiceCapability_RPC_Type): string {
  switch (object) {
    case NodeServiceCapability_RPC_Type.UNKNOWN:
      return "UNKNOWN";
    case NodeServiceCapability_RPC_Type.STAGE_UNSTAGE_VOLUME:
      return "STAGE_UNSTAGE_VOLUME";
    case NodeServiceCapability_RPC_Type.GET_VOLUME_STATS:
      return "GET_VOLUME_STATS";
    case NodeServiceCapability_RPC_Type.EXPAND_VOLUME:
      return "EXPAND_VOLUME";
    case NodeServiceCapability_RPC_Type.VOLUME_CONDITION:
      return "VOLUME_CONDITION";
    case NodeServiceCapability_RPC_Type.SINGLE_NODE_MULTI_WRITER:
      return "SINGLE_NODE_MULTI_WRITER";
    case NodeServiceCapability_RPC_Type.VOLUME_MOUNT_GROUP:
      return "VOLUME_MOUNT_GROUP";
    case NodeServiceCapability_RPC_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NodeGetInfoRequest {
}

export interface NodeGetInfoResponse {
  /**
   * The identifier of the node as understood by the SP.
   * This field is REQUIRED.
   * This field MUST contain enough information to uniquely identify
   * this specific node vs all other nodes supported by this plugin.
   * This field SHALL be used by the CO in subsequent calls, including
   * `ControllerPublishVolume`, to refer to this node.
   * The SP is NOT responsible for global uniqueness of node_id across
   * multiple SPs.
   * This field overrides the general CSI size limit.
   * The size of this field SHALL NOT exceed 256 bytes. The general
   * CSI size limit, 128 byte, is RECOMMENDED for best backwards
   * compatibility.
   */
  nodeId: string;
  /**
   * Maximum number of volumes that controller can publish to the node.
   * If value is not set or zero CO SHALL decide how many volumes of
   * this type can be published by the controller to the node. The
   * plugin MUST NOT set negative values here.
   * This field is OPTIONAL.
   */
  maxVolumesPerNode: Long;
  /**
   * Specifies where (regions, zones, racks, etc.) the node is
   * accessible from.
   * A plugin that returns this field MUST also set the
   * VOLUME_ACCESSIBILITY_CONSTRAINTS plugin capability.
   * COs MAY use this information along with the topology information
   * returned in CreateVolumeResponse to ensure that a given volume is
   * accessible from a given node when scheduling workloads.
   * This field is OPTIONAL. If it is not specified, the CO MAY assume
   * the node is not subject to any topological constraint, and MAY
   * schedule workloads that reference any volume V, such that there are
   * no topological constraints declared for V.
   *
   * Example 1:
   *   accessible_topology =
   *     {"region": "R1", "zone": "Z2"}
   * Indicates the node exists within the "region" "R1" and the "zone"
   * "Z2".
   */
  accessibleTopology: Topology | undefined;
}

export interface NodeExpandVolumeRequest {
  /** The ID of the volume. This field is REQUIRED. */
  volumeId: string;
  /**
   * The path on which volume is available. This field is REQUIRED.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  volumePath: string;
  /**
   * This allows CO to specify the capacity requirements of the volume
   * after expansion. If capacity_range is omitted then a plugin MAY
   * inspect the file system of the volume to determine the maximum
   * capacity to which the volume can be expanded. In such cases a
   * plugin MAY expand the volume to its maximum capacity.
   * This field is OPTIONAL.
   */
  capacityRange:
    | CapacityRange
    | undefined;
  /**
   * The path where the volume is staged, if the plugin has the
   * STAGE_UNSTAGE_VOLUME capability, otherwise empty.
   * If not empty, it MUST be an absolute path in the root
   * filesystem of the process serving this request.
   * This field is OPTIONAL.
   * This field overrides the general CSI size limit.
   * SP SHOULD support the maximum path length allowed by the operating
   * system/filesystem, but, at a minimum, SP MUST accept a max path
   * length of at least 128 bytes.
   */
  stagingTargetPath: string;
  /**
   * Volume capability describing how the CO intends to use this volume.
   * This allows SP to determine if volume is being used as a block
   * device or mounted file system. For example - if volume is being
   * used as a block device the SP MAY choose to skip expanding the
   * filesystem in NodeExpandVolume implementation but still perform
   * rest of the housekeeping needed for expanding the volume. If
   * volume_capability is omitted the SP MAY determine
   * access_type from given volume_path for the volume and perform
   * node expansion. This is an OPTIONAL field.
   */
  volumeCapability:
    | VolumeCapability
    | undefined;
  /**
   * Secrets required by plugin to complete node expand volume request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   */
  secrets: { [key: string]: string };
}

export interface NodeExpandVolumeRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface NodeExpandVolumeResponse {
  /** The capacity of the volume in bytes. This field is OPTIONAL. */
  capacityBytes: Long;
}

export interface GroupControllerGetCapabilitiesRequest {
}

export interface GroupControllerGetCapabilitiesResponse {
  /**
   * All the capabilities that the group controller service supports.
   * This field is OPTIONAL.
   */
  capabilities: GroupControllerServiceCapability[];
}

/** Specifies a capability of the group controller service. */
export interface GroupControllerServiceCapability {
  type?: { $case: "rpc"; rpc: GroupControllerServiceCapability_RPC };
}

export interface GroupControllerServiceCapability_RPC {
  type: GroupControllerServiceCapability_RPC_Type;
}

export enum GroupControllerServiceCapability_RPC_Type {
  UNKNOWN = 0,
  /**
   * CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT - Indicates that the group controller plugin supports
   * creating, deleting, and getting details of a volume
   * group snapshot.
   */
  CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT = 1,
  UNRECOGNIZED = -1,
}

export function groupControllerServiceCapability_RPC_TypeFromJSON(
  object: any,
): GroupControllerServiceCapability_RPC_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return GroupControllerServiceCapability_RPC_Type.UNKNOWN;
    case 1:
    case "CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT":
      return GroupControllerServiceCapability_RPC_Type.CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GroupControllerServiceCapability_RPC_Type.UNRECOGNIZED;
  }
}

export function groupControllerServiceCapability_RPC_TypeToJSON(
  object: GroupControllerServiceCapability_RPC_Type,
): string {
  switch (object) {
    case GroupControllerServiceCapability_RPC_Type.UNKNOWN:
      return "UNKNOWN";
    case GroupControllerServiceCapability_RPC_Type.CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT:
      return "CREATE_DELETE_GET_VOLUME_GROUP_SNAPSHOT";
    case GroupControllerServiceCapability_RPC_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateVolumeGroupSnapshotRequest {
  /**
   * The suggested name for the group snapshot. This field is REQUIRED
   * for idempotency.
   * Any Unicode string that conforms to the length limit is allowed
   * except those containing the following banned characters:
   * U+0000-U+0008, U+000B, U+000C, U+000E-U+001F, U+007F-U+009F.
   * (These are control characters other than commonly used whitespace.)
   */
  name: string;
  /**
   * volume IDs of the source volumes to be snapshotted together.
   * This field is REQUIRED.
   */
  sourceVolumeIds: string[];
  /**
   * Secrets required by plugin to complete
   * ControllerCreateVolumeGroupSnapshot request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   * The secrets provided in this field SHOULD be the same for
   * all group snapshot operations on the same group snapshot.
   */
  secrets: { [key: string]: string };
  /**
   * Plugin specific parameters passed in as opaque key-value pairs.
   * This field is OPTIONAL. The Plugin is responsible for parsing and
   * validating these parameters. COs will treat these as opaque.
   */
  parameters: { [key: string]: string };
}

export interface CreateVolumeGroupSnapshotRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface CreateVolumeGroupSnapshotRequest_ParametersEntry {
  key: string;
  value: string;
}

export interface CreateVolumeGroupSnapshotResponse {
  /**
   * Contains all attributes of the newly created group snapshot.
   * This field is REQUIRED.
   */
  groupSnapshot: VolumeGroupSnapshot | undefined;
}

export interface VolumeGroupSnapshot {
  /**
   * The identifier for this group snapshot, generated by the plugin.
   * This field MUST contain enough information to uniquely identify
   * this specific snapshot vs all other group snapshots supported by
   * this plugin.
   * This field SHALL be used by the CO in subsequent calls to refer to
   * this group snapshot.
   * The SP is NOT responsible for global uniqueness of
   * group_snapshot_id across multiple SPs.
   * This field is REQUIRED.
   */
  groupSnapshotId: string;
  /**
   * A list of snapshots belonging to this group.
   * This field is REQUIRED.
   */
  snapshots: Snapshot[];
  /**
   * Timestamp of when the volume group snapshot was taken.
   * This field is REQUIRED.
   */
  creationTime:
    | Date
    | undefined;
  /**
   * Indicates if all individual snapshots in the group snapshot
   * are ready to use as a `volume_content_source` in a
   * `CreateVolumeRequest`. The default value is false.
   * If any snapshot in the list of snapshots in this message have
   * ready_to_use set to false, the SP MUST set this field to false.
   * If all of the snapshots in the list of snapshots in this message
   * have ready_to_use set to true, the SP SHOULD set this field to
   * true.
   * This field is REQUIRED.
   */
  readyToUse: boolean;
}

export interface DeleteVolumeGroupSnapshotRequest {
  /**
   * The ID of the group snapshot to be deleted.
   * This field is REQUIRED.
   */
  groupSnapshotId: string;
  /**
   * A list of snapshot IDs that are part of this group snapshot.
   * If SP does not need to rely on this field to delete the snapshots
   * in the group, it SHOULD check this field and report an error
   * if it has the ability to detect a mismatch.
   * Some SPs require this list to delete the snapshots in the group.
   * If SP needs to use this field to delete the snapshots in the
   * group, it MUST report an error if it has the ability to detect
   * a mismatch.
   * This field is REQUIRED.
   */
  snapshotIds: string[];
  /**
   * Secrets required by plugin to complete group snapshot deletion
   * request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   * The secrets provided in this field SHOULD be the same for
   * all group snapshot operations on the same group snapshot.
   */
  secrets: { [key: string]: string };
}

export interface DeleteVolumeGroupSnapshotRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface DeleteVolumeGroupSnapshotResponse {
}

export interface GetVolumeGroupSnapshotRequest {
  /**
   * The ID of the group snapshot to fetch current group snapshot
   * information for.
   * This field is REQUIRED.
   */
  groupSnapshotId: string;
  /**
   * A list of snapshot IDs that are part of this group snapshot.
   * If SP does not need to rely on this field to get the snapshots
   * in the group, it SHOULD check this field and report an error
   * if it has the ability to detect a mismatch.
   * Some SPs require this list to get the snapshots in the group.
   * If SP needs to use this field to get the snapshots in the
   * group, it MUST report an error if it has the ability to detect
   * a mismatch.
   * This field is REQUIRED.
   */
  snapshotIds: string[];
  /**
   * Secrets required by plugin to complete
   * GetVolumeGroupSnapshot request.
   * This field is OPTIONAL. Refer to the `Secrets Requirements`
   * section on how to use this field.
   * The secrets provided in this field SHOULD be the same for
   * all group snapshot operations on the same group snapshot.
   */
  secrets: { [key: string]: string };
}

export interface GetVolumeGroupSnapshotRequest_SecretsEntry {
  key: string;
  value: string;
}

export interface GetVolumeGroupSnapshotResponse {
  /** This field is REQUIRED */
  groupSnapshot: VolumeGroupSnapshot | undefined;
}

function createBaseGetPluginInfoRequest(): GetPluginInfoRequest {
  return {};
}

export const GetPluginInfoRequest = {
  encode(_: GetPluginInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPluginInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPluginInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetPluginInfoRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetPluginInfoRequest | GetPluginInfoRequest[]>
      | Iterable<GetPluginInfoRequest | GetPluginInfoRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoRequest.encode(p).finish()];
        }
      } else {
        yield* [GetPluginInfoRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetPluginInfoRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetPluginInfoRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoRequest.decode(p)];
        }
      } else {
        yield* [GetPluginInfoRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): GetPluginInfoRequest {
    return {};
  },

  toJSON(_: GetPluginInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPluginInfoRequest>, I>>(base?: I): GetPluginInfoRequest {
    return GetPluginInfoRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetPluginInfoRequest>, I>>(_: I): GetPluginInfoRequest {
    const message = createBaseGetPluginInfoRequest();
    return message;
  },
};

function createBaseGetPluginInfoResponse(): GetPluginInfoResponse {
  return { name: "", vendorVersion: "", manifest: {} };
}

export const GetPluginInfoResponse = {
  encode(message: GetPluginInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.vendorVersion !== "") {
      writer.uint32(18).string(message.vendorVersion);
    }
    Object.entries(message.manifest).forEach(([key, value]) => {
      GetPluginInfoResponse_ManifestEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPluginInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPluginInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.vendorVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = GetPluginInfoResponse_ManifestEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.manifest[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetPluginInfoResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetPluginInfoResponse | GetPluginInfoResponse[]>
      | Iterable<GetPluginInfoResponse | GetPluginInfoResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoResponse.encode(p).finish()];
        }
      } else {
        yield* [GetPluginInfoResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetPluginInfoResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetPluginInfoResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoResponse.decode(p)];
        }
      } else {
        yield* [GetPluginInfoResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetPluginInfoResponse {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      vendorVersion: isSet(object.vendorVersion) ? String(object.vendorVersion) : "",
      manifest: isObject(object.manifest)
        ? Object.entries(object.manifest).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GetPluginInfoResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.vendorVersion !== undefined && (obj.vendorVersion = message.vendorVersion);
    obj.manifest = {};
    if (message.manifest) {
      Object.entries(message.manifest).forEach(([k, v]) => {
        obj.manifest[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPluginInfoResponse>, I>>(base?: I): GetPluginInfoResponse {
    return GetPluginInfoResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetPluginInfoResponse>, I>>(object: I): GetPluginInfoResponse {
    const message = createBaseGetPluginInfoResponse();
    message.name = object.name ?? "";
    message.vendorVersion = object.vendorVersion ?? "";
    message.manifest = Object.entries(object.manifest ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetPluginInfoResponse_ManifestEntry(): GetPluginInfoResponse_ManifestEntry {
  return { key: "", value: "" };
}

export const GetPluginInfoResponse_ManifestEntry = {
  encode(message: GetPluginInfoResponse_ManifestEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPluginInfoResponse_ManifestEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPluginInfoResponse_ManifestEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetPluginInfoResponse_ManifestEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetPluginInfoResponse_ManifestEntry | GetPluginInfoResponse_ManifestEntry[]>
      | Iterable<GetPluginInfoResponse_ManifestEntry | GetPluginInfoResponse_ManifestEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoResponse_ManifestEntry.encode(p).finish()];
        }
      } else {
        yield* [GetPluginInfoResponse_ManifestEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetPluginInfoResponse_ManifestEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetPluginInfoResponse_ManifestEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginInfoResponse_ManifestEntry.decode(p)];
        }
      } else {
        yield* [GetPluginInfoResponse_ManifestEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetPluginInfoResponse_ManifestEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: GetPluginInfoResponse_ManifestEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPluginInfoResponse_ManifestEntry>, I>>(
    base?: I,
  ): GetPluginInfoResponse_ManifestEntry {
    return GetPluginInfoResponse_ManifestEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetPluginInfoResponse_ManifestEntry>, I>>(
    object: I,
  ): GetPluginInfoResponse_ManifestEntry {
    const message = createBaseGetPluginInfoResponse_ManifestEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetPluginCapabilitiesRequest(): GetPluginCapabilitiesRequest {
  return {};
}

export const GetPluginCapabilitiesRequest = {
  encode(_: GetPluginCapabilitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPluginCapabilitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPluginCapabilitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetPluginCapabilitiesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetPluginCapabilitiesRequest | GetPluginCapabilitiesRequest[]>
      | Iterable<GetPluginCapabilitiesRequest | GetPluginCapabilitiesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginCapabilitiesRequest.encode(p).finish()];
        }
      } else {
        yield* [GetPluginCapabilitiesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetPluginCapabilitiesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetPluginCapabilitiesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginCapabilitiesRequest.decode(p)];
        }
      } else {
        yield* [GetPluginCapabilitiesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): GetPluginCapabilitiesRequest {
    return {};
  },

  toJSON(_: GetPluginCapabilitiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPluginCapabilitiesRequest>, I>>(base?: I): GetPluginCapabilitiesRequest {
    return GetPluginCapabilitiesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetPluginCapabilitiesRequest>, I>>(_: I): GetPluginCapabilitiesRequest {
    const message = createBaseGetPluginCapabilitiesRequest();
    return message;
  },
};

function createBaseGetPluginCapabilitiesResponse(): GetPluginCapabilitiesResponse {
  return { capabilities: [] };
}

export const GetPluginCapabilitiesResponse = {
  encode(message: GetPluginCapabilitiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.capabilities) {
      PluginCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPluginCapabilitiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPluginCapabilitiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.capabilities.push(PluginCapability.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetPluginCapabilitiesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetPluginCapabilitiesResponse | GetPluginCapabilitiesResponse[]>
      | Iterable<GetPluginCapabilitiesResponse | GetPluginCapabilitiesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginCapabilitiesResponse.encode(p).finish()];
        }
      } else {
        yield* [GetPluginCapabilitiesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetPluginCapabilitiesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetPluginCapabilitiesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetPluginCapabilitiesResponse.decode(p)];
        }
      } else {
        yield* [GetPluginCapabilitiesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetPluginCapabilitiesResponse {
    return {
      capabilities: Array.isArray(object?.capabilities)
        ? object.capabilities.map((e: any) => PluginCapability.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPluginCapabilitiesResponse): unknown {
    const obj: any = {};
    if (message.capabilities) {
      obj.capabilities = message.capabilities.map((e) => e ? PluginCapability.toJSON(e) : undefined);
    } else {
      obj.capabilities = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPluginCapabilitiesResponse>, I>>(base?: I): GetPluginCapabilitiesResponse {
    return GetPluginCapabilitiesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetPluginCapabilitiesResponse>, I>>(
    object: I,
  ): GetPluginCapabilitiesResponse {
    const message = createBaseGetPluginCapabilitiesResponse();
    message.capabilities = object.capabilities?.map((e) => PluginCapability.fromPartial(e)) || [];
    return message;
  },
};

function createBasePluginCapability(): PluginCapability {
  return { type: undefined };
}

export const PluginCapability = {
  encode(message: PluginCapability, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.type?.$case) {
      case "service":
        PluginCapability_Service.encode(message.type.service, writer.uint32(10).fork()).ldelim();
        break;
      case "volumeExpansion":
        PluginCapability_VolumeExpansion.encode(message.type.volumeExpansion, writer.uint32(18).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginCapability {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = { $case: "service", service: PluginCapability_Service.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = {
            $case: "volumeExpansion",
            volumeExpansion: PluginCapability_VolumeExpansion.decode(reader, reader.uint32()),
          };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<PluginCapability, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<PluginCapability | PluginCapability[]> | Iterable<PluginCapability | PluginCapability[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability.encode(p).finish()];
        }
      } else {
        yield* [PluginCapability.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, PluginCapability>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<PluginCapability> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability.decode(p)];
        }
      } else {
        yield* [PluginCapability.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): PluginCapability {
    return {
      type: isSet(object.service)
        ? { $case: "service", service: PluginCapability_Service.fromJSON(object.service) }
        : isSet(object.volumeExpansion)
        ? {
          $case: "volumeExpansion",
          volumeExpansion: PluginCapability_VolumeExpansion.fromJSON(object.volumeExpansion),
        }
        : undefined,
    };
  },

  toJSON(message: PluginCapability): unknown {
    const obj: any = {};
    message.type?.$case === "service" &&
      (obj.service = message.type?.service ? PluginCapability_Service.toJSON(message.type?.service) : undefined);
    message.type?.$case === "volumeExpansion" &&
      (obj.volumeExpansion = message.type?.volumeExpansion
        ? PluginCapability_VolumeExpansion.toJSON(message.type?.volumeExpansion)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginCapability>, I>>(base?: I): PluginCapability {
    return PluginCapability.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PluginCapability>, I>>(object: I): PluginCapability {
    const message = createBasePluginCapability();
    if (object.type?.$case === "service" && object.type?.service !== undefined && object.type?.service !== null) {
      message.type = { $case: "service", service: PluginCapability_Service.fromPartial(object.type.service) };
    }
    if (
      object.type?.$case === "volumeExpansion" &&
      object.type?.volumeExpansion !== undefined &&
      object.type?.volumeExpansion !== null
    ) {
      message.type = {
        $case: "volumeExpansion",
        volumeExpansion: PluginCapability_VolumeExpansion.fromPartial(object.type.volumeExpansion),
      };
    }
    return message;
  },
};

function createBasePluginCapability_Service(): PluginCapability_Service {
  return { type: 0 };
}

export const PluginCapability_Service = {
  encode(message: PluginCapability_Service, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginCapability_Service {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginCapability_Service();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<PluginCapability_Service, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<PluginCapability_Service | PluginCapability_Service[]>
      | Iterable<PluginCapability_Service | PluginCapability_Service[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability_Service.encode(p).finish()];
        }
      } else {
        yield* [PluginCapability_Service.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, PluginCapability_Service>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<PluginCapability_Service> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability_Service.decode(p)];
        }
      } else {
        yield* [PluginCapability_Service.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): PluginCapability_Service {
    return { type: isSet(object.type) ? pluginCapability_Service_TypeFromJSON(object.type) : 0 };
  },

  toJSON(message: PluginCapability_Service): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = pluginCapability_Service_TypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginCapability_Service>, I>>(base?: I): PluginCapability_Service {
    return PluginCapability_Service.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PluginCapability_Service>, I>>(object: I): PluginCapability_Service {
    const message = createBasePluginCapability_Service();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBasePluginCapability_VolumeExpansion(): PluginCapability_VolumeExpansion {
  return { type: 0 };
}

export const PluginCapability_VolumeExpansion = {
  encode(message: PluginCapability_VolumeExpansion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginCapability_VolumeExpansion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginCapability_VolumeExpansion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<PluginCapability_VolumeExpansion, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<PluginCapability_VolumeExpansion | PluginCapability_VolumeExpansion[]>
      | Iterable<PluginCapability_VolumeExpansion | PluginCapability_VolumeExpansion[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability_VolumeExpansion.encode(p).finish()];
        }
      } else {
        yield* [PluginCapability_VolumeExpansion.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, PluginCapability_VolumeExpansion>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<PluginCapability_VolumeExpansion> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [PluginCapability_VolumeExpansion.decode(p)];
        }
      } else {
        yield* [PluginCapability_VolumeExpansion.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): PluginCapability_VolumeExpansion {
    return { type: isSet(object.type) ? pluginCapability_VolumeExpansion_TypeFromJSON(object.type) : 0 };
  },

  toJSON(message: PluginCapability_VolumeExpansion): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = pluginCapability_VolumeExpansion_TypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<PluginCapability_VolumeExpansion>, I>>(
    base?: I,
  ): PluginCapability_VolumeExpansion {
    return PluginCapability_VolumeExpansion.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PluginCapability_VolumeExpansion>, I>>(
    object: I,
  ): PluginCapability_VolumeExpansion {
    const message = createBasePluginCapability_VolumeExpansion();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseProbeRequest(): ProbeRequest {
  return {};
}

export const ProbeRequest = {
  encode(_: ProbeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProbeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProbeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ProbeRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<ProbeRequest | ProbeRequest[]> | Iterable<ProbeRequest | ProbeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ProbeRequest.encode(p).finish()];
        }
      } else {
        yield* [ProbeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ProbeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ProbeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ProbeRequest.decode(p)];
        }
      } else {
        yield* [ProbeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): ProbeRequest {
    return {};
  },

  toJSON(_: ProbeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ProbeRequest>, I>>(base?: I): ProbeRequest {
    return ProbeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProbeRequest>, I>>(_: I): ProbeRequest {
    const message = createBaseProbeRequest();
    return message;
  },
};

function createBaseProbeResponse(): ProbeResponse {
  return { ready: undefined };
}

export const ProbeResponse = {
  encode(message: ProbeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ready !== undefined) {
      BoolValue.encode({ value: message.ready! }, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProbeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProbeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ready = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ProbeResponse, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<ProbeResponse | ProbeResponse[]> | Iterable<ProbeResponse | ProbeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ProbeResponse.encode(p).finish()];
        }
      } else {
        yield* [ProbeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ProbeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ProbeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ProbeResponse.decode(p)];
        }
      } else {
        yield* [ProbeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ProbeResponse {
    return { ready: isSet(object.ready) ? Boolean(object.ready) : undefined };
  },

  toJSON(message: ProbeResponse): unknown {
    const obj: any = {};
    message.ready !== undefined && (obj.ready = message.ready);
    return obj;
  },

  create<I extends Exact<DeepPartial<ProbeResponse>, I>>(base?: I): ProbeResponse {
    return ProbeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProbeResponse>, I>>(object: I): ProbeResponse {
    const message = createBaseProbeResponse();
    message.ready = object.ready ?? undefined;
    return message;
  },
};

function createBaseCreateVolumeRequest(): CreateVolumeRequest {
  return {
    name: "",
    capacityRange: undefined,
    volumeCapabilities: [],
    parameters: {},
    secrets: {},
    volumeContentSource: undefined,
    accessibilityRequirements: undefined,
  };
}

export const CreateVolumeRequest = {
  encode(message: CreateVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.capacityRange !== undefined) {
      CapacityRange.encode(message.capacityRange, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.volumeCapabilities) {
      VolumeCapability.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      CreateVolumeRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.secrets).forEach(([key, value]) => {
      CreateVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.volumeContentSource !== undefined) {
      VolumeContentSource.encode(message.volumeContentSource, writer.uint32(50).fork()).ldelim();
    }
    if (message.accessibilityRequirements !== undefined) {
      TopologyRequirement.encode(message.accessibilityRequirements, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.capacityRange = CapacityRange.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.volumeCapabilities.push(VolumeCapability.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = CreateVolumeRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = CreateVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.secrets[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.volumeContentSource = VolumeContentSource.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.accessibilityRequirements = TopologyRequirement.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeRequest | CreateVolumeRequest[]>
      | Iterable<CreateVolumeRequest | CreateVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest.decode(p)];
        }
      } else {
        yield* [CreateVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      capacityRange: isSet(object.capacityRange) ? CapacityRange.fromJSON(object.capacityRange) : undefined,
      volumeCapabilities: Array.isArray(object?.volumeCapabilities)
        ? object.volumeCapabilities.map((e: any) => VolumeCapability.fromJSON(e))
        : [],
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeContentSource: isSet(object.volumeContentSource)
        ? VolumeContentSource.fromJSON(object.volumeContentSource)
        : undefined,
      accessibilityRequirements: isSet(object.accessibilityRequirements)
        ? TopologyRequirement.fromJSON(object.accessibilityRequirements)
        : undefined,
    };
  },

  toJSON(message: CreateVolumeRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.capacityRange !== undefined &&
      (obj.capacityRange = message.capacityRange ? CapacityRange.toJSON(message.capacityRange) : undefined);
    if (message.volumeCapabilities) {
      obj.volumeCapabilities = message.volumeCapabilities.map((e) => e ? VolumeCapability.toJSON(e) : undefined);
    } else {
      obj.volumeCapabilities = [];
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    message.volumeContentSource !== undefined &&
      (obj.volumeContentSource = message.volumeContentSource
        ? VolumeContentSource.toJSON(message.volumeContentSource)
        : undefined);
    message.accessibilityRequirements !== undefined &&
      (obj.accessibilityRequirements = message.accessibilityRequirements
        ? TopologyRequirement.toJSON(message.accessibilityRequirements)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeRequest>, I>>(base?: I): CreateVolumeRequest {
    return CreateVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeRequest>, I>>(object: I): CreateVolumeRequest {
    const message = createBaseCreateVolumeRequest();
    message.name = object.name ?? "";
    message.capacityRange = (object.capacityRange !== undefined && object.capacityRange !== null)
      ? CapacityRange.fromPartial(object.capacityRange)
      : undefined;
    message.volumeCapabilities = object.volumeCapabilities?.map((e) => VolumeCapability.fromPartial(e)) || [];
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.volumeContentSource = (object.volumeContentSource !== undefined && object.volumeContentSource !== null)
      ? VolumeContentSource.fromPartial(object.volumeContentSource)
      : undefined;
    message.accessibilityRequirements =
      (object.accessibilityRequirements !== undefined && object.accessibilityRequirements !== null)
        ? TopologyRequirement.fromPartial(object.accessibilityRequirements)
        : undefined;
    return message;
  },
};

function createBaseCreateVolumeRequest_ParametersEntry(): CreateVolumeRequest_ParametersEntry {
  return { key: "", value: "" };
}

export const CreateVolumeRequest_ParametersEntry = {
  encode(message: CreateVolumeRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeRequest_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeRequest_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeRequest_ParametersEntry | CreateVolumeRequest_ParametersEntry[]>
      | Iterable<CreateVolumeRequest_ParametersEntry | CreateVolumeRequest_ParametersEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeRequest_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeRequest_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeRequest_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest_ParametersEntry.decode(p)];
        }
      } else {
        yield* [CreateVolumeRequest_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeRequest_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateVolumeRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeRequest_ParametersEntry>, I>>(
    base?: I,
  ): CreateVolumeRequest_ParametersEntry {
    return CreateVolumeRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeRequest_ParametersEntry>, I>>(
    object: I,
  ): CreateVolumeRequest_ParametersEntry {
    const message = createBaseCreateVolumeRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateVolumeRequest_SecretsEntry(): CreateVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const CreateVolumeRequest_SecretsEntry = {
  encode(message: CreateVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeRequest_SecretsEntry | CreateVolumeRequest_SecretsEntry[]>
      | Iterable<CreateVolumeRequest_SecretsEntry | CreateVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [CreateVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): CreateVolumeRequest_SecretsEntry {
    return CreateVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): CreateVolumeRequest_SecretsEntry {
    const message = createBaseCreateVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseVolumeContentSource(): VolumeContentSource {
  return { type: undefined };
}

export const VolumeContentSource = {
  encode(message: VolumeContentSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.type?.$case) {
      case "snapshot":
        VolumeContentSource_SnapshotSource.encode(message.type.snapshot, writer.uint32(10).fork()).ldelim();
        break;
      case "volume":
        VolumeContentSource_VolumeSource.encode(message.type.volume, writer.uint32(18).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeContentSource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeContentSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = {
            $case: "snapshot",
            snapshot: VolumeContentSource_SnapshotSource.decode(reader, reader.uint32()),
          };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = { $case: "volume", volume: VolumeContentSource_VolumeSource.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeContentSource, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeContentSource | VolumeContentSource[]>
      | Iterable<VolumeContentSource | VolumeContentSource[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource.encode(p).finish()];
        }
      } else {
        yield* [VolumeContentSource.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeContentSource>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeContentSource> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource.decode(p)];
        }
      } else {
        yield* [VolumeContentSource.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeContentSource {
    return {
      type: isSet(object.snapshot)
        ? { $case: "snapshot", snapshot: VolumeContentSource_SnapshotSource.fromJSON(object.snapshot) }
        : isSet(object.volume)
        ? { $case: "volume", volume: VolumeContentSource_VolumeSource.fromJSON(object.volume) }
        : undefined,
    };
  },

  toJSON(message: VolumeContentSource): unknown {
    const obj: any = {};
    message.type?.$case === "snapshot" &&
      (obj.snapshot = message.type?.snapshot
        ? VolumeContentSource_SnapshotSource.toJSON(message.type?.snapshot)
        : undefined);
    message.type?.$case === "volume" &&
      (obj.volume = message.type?.volume ? VolumeContentSource_VolumeSource.toJSON(message.type?.volume) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeContentSource>, I>>(base?: I): VolumeContentSource {
    return VolumeContentSource.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeContentSource>, I>>(object: I): VolumeContentSource {
    const message = createBaseVolumeContentSource();
    if (object.type?.$case === "snapshot" && object.type?.snapshot !== undefined && object.type?.snapshot !== null) {
      message.type = {
        $case: "snapshot",
        snapshot: VolumeContentSource_SnapshotSource.fromPartial(object.type.snapshot),
      };
    }
    if (object.type?.$case === "volume" && object.type?.volume !== undefined && object.type?.volume !== null) {
      message.type = { $case: "volume", volume: VolumeContentSource_VolumeSource.fromPartial(object.type.volume) };
    }
    return message;
  },
};

function createBaseVolumeContentSource_SnapshotSource(): VolumeContentSource_SnapshotSource {
  return { snapshotId: "" };
}

export const VolumeContentSource_SnapshotSource = {
  encode(message: VolumeContentSource_SnapshotSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshotId !== "") {
      writer.uint32(10).string(message.snapshotId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeContentSource_SnapshotSource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeContentSource_SnapshotSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshotId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeContentSource_SnapshotSource, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeContentSource_SnapshotSource | VolumeContentSource_SnapshotSource[]>
      | Iterable<VolumeContentSource_SnapshotSource | VolumeContentSource_SnapshotSource[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource_SnapshotSource.encode(p).finish()];
        }
      } else {
        yield* [VolumeContentSource_SnapshotSource.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeContentSource_SnapshotSource>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeContentSource_SnapshotSource> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource_SnapshotSource.decode(p)];
        }
      } else {
        yield* [VolumeContentSource_SnapshotSource.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeContentSource_SnapshotSource {
    return { snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "" };
  },

  toJSON(message: VolumeContentSource_SnapshotSource): unknown {
    const obj: any = {};
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeContentSource_SnapshotSource>, I>>(
    base?: I,
  ): VolumeContentSource_SnapshotSource {
    return VolumeContentSource_SnapshotSource.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeContentSource_SnapshotSource>, I>>(
    object: I,
  ): VolumeContentSource_SnapshotSource {
    const message = createBaseVolumeContentSource_SnapshotSource();
    message.snapshotId = object.snapshotId ?? "";
    return message;
  },
};

function createBaseVolumeContentSource_VolumeSource(): VolumeContentSource_VolumeSource {
  return { volumeId: "" };
}

export const VolumeContentSource_VolumeSource = {
  encode(message: VolumeContentSource_VolumeSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeContentSource_VolumeSource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeContentSource_VolumeSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeContentSource_VolumeSource, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeContentSource_VolumeSource | VolumeContentSource_VolumeSource[]>
      | Iterable<VolumeContentSource_VolumeSource | VolumeContentSource_VolumeSource[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource_VolumeSource.encode(p).finish()];
        }
      } else {
        yield* [VolumeContentSource_VolumeSource.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeContentSource_VolumeSource>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeContentSource_VolumeSource> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeContentSource_VolumeSource.decode(p)];
        }
      } else {
        yield* [VolumeContentSource_VolumeSource.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeContentSource_VolumeSource {
    return { volumeId: isSet(object.volumeId) ? String(object.volumeId) : "" };
  },

  toJSON(message: VolumeContentSource_VolumeSource): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeContentSource_VolumeSource>, I>>(
    base?: I,
  ): VolumeContentSource_VolumeSource {
    return VolumeContentSource_VolumeSource.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeContentSource_VolumeSource>, I>>(
    object: I,
  ): VolumeContentSource_VolumeSource {
    const message = createBaseVolumeContentSource_VolumeSource();
    message.volumeId = object.volumeId ?? "";
    return message;
  },
};

function createBaseCreateVolumeResponse(): CreateVolumeResponse {
  return { volume: undefined };
}

export const CreateVolumeResponse = {
  encode(message: CreateVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volume = Volume.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeResponse | CreateVolumeResponse[]>
      | Iterable<CreateVolumeResponse | CreateVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeResponse.decode(p)];
        }
      } else {
        yield* [CreateVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeResponse {
    return { volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined };
  },

  toJSON(message: CreateVolumeResponse): unknown {
    const obj: any = {};
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeResponse>, I>>(base?: I): CreateVolumeResponse {
    return CreateVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeResponse>, I>>(object: I): CreateVolumeResponse {
    const message = createBaseCreateVolumeResponse();
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    return message;
  },
};

function createBaseVolumeCapability(): VolumeCapability {
  return { accessType: undefined, accessMode: undefined };
}

export const VolumeCapability = {
  encode(message: VolumeCapability, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.accessType?.$case) {
      case "block":
        VolumeCapability_BlockVolume.encode(message.accessType.block, writer.uint32(10).fork()).ldelim();
        break;
      case "mount":
        VolumeCapability_MountVolume.encode(message.accessType.mount, writer.uint32(18).fork()).ldelim();
        break;
    }
    if (message.accessMode !== undefined) {
      VolumeCapability_AccessMode.encode(message.accessMode, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeCapability {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessType = { $case: "block", block: VolumeCapability_BlockVolume.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accessType = { $case: "mount", mount: VolumeCapability_MountVolume.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accessMode = VolumeCapability_AccessMode.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeCapability, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<VolumeCapability | VolumeCapability[]> | Iterable<VolumeCapability | VolumeCapability[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability.encode(p).finish()];
        }
      } else {
        yield* [VolumeCapability.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeCapability>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeCapability> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability.decode(p)];
        }
      } else {
        yield* [VolumeCapability.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeCapability {
    return {
      accessType: isSet(object.block)
        ? { $case: "block", block: VolumeCapability_BlockVolume.fromJSON(object.block) }
        : isSet(object.mount)
        ? { $case: "mount", mount: VolumeCapability_MountVolume.fromJSON(object.mount) }
        : undefined,
      accessMode: isSet(object.accessMode) ? VolumeCapability_AccessMode.fromJSON(object.accessMode) : undefined,
    };
  },

  toJSON(message: VolumeCapability): unknown {
    const obj: any = {};
    message.accessType?.$case === "block" &&
      (obj.block = message.accessType?.block
        ? VolumeCapability_BlockVolume.toJSON(message.accessType?.block)
        : undefined);
    message.accessType?.$case === "mount" &&
      (obj.mount = message.accessType?.mount
        ? VolumeCapability_MountVolume.toJSON(message.accessType?.mount)
        : undefined);
    message.accessMode !== undefined &&
      (obj.accessMode = message.accessMode ? VolumeCapability_AccessMode.toJSON(message.accessMode) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeCapability>, I>>(base?: I): VolumeCapability {
    return VolumeCapability.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeCapability>, I>>(object: I): VolumeCapability {
    const message = createBaseVolumeCapability();
    if (
      object.accessType?.$case === "block" &&
      object.accessType?.block !== undefined &&
      object.accessType?.block !== null
    ) {
      message.accessType = { $case: "block", block: VolumeCapability_BlockVolume.fromPartial(object.accessType.block) };
    }
    if (
      object.accessType?.$case === "mount" &&
      object.accessType?.mount !== undefined &&
      object.accessType?.mount !== null
    ) {
      message.accessType = { $case: "mount", mount: VolumeCapability_MountVolume.fromPartial(object.accessType.mount) };
    }
    message.accessMode = (object.accessMode !== undefined && object.accessMode !== null)
      ? VolumeCapability_AccessMode.fromPartial(object.accessMode)
      : undefined;
    return message;
  },
};

function createBaseVolumeCapability_BlockVolume(): VolumeCapability_BlockVolume {
  return {};
}

export const VolumeCapability_BlockVolume = {
  encode(_: VolumeCapability_BlockVolume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeCapability_BlockVolume {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeCapability_BlockVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeCapability_BlockVolume, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeCapability_BlockVolume | VolumeCapability_BlockVolume[]>
      | Iterable<VolumeCapability_BlockVolume | VolumeCapability_BlockVolume[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_BlockVolume.encode(p).finish()];
        }
      } else {
        yield* [VolumeCapability_BlockVolume.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeCapability_BlockVolume>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeCapability_BlockVolume> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_BlockVolume.decode(p)];
        }
      } else {
        yield* [VolumeCapability_BlockVolume.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): VolumeCapability_BlockVolume {
    return {};
  },

  toJSON(_: VolumeCapability_BlockVolume): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeCapability_BlockVolume>, I>>(base?: I): VolumeCapability_BlockVolume {
    return VolumeCapability_BlockVolume.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeCapability_BlockVolume>, I>>(_: I): VolumeCapability_BlockVolume {
    const message = createBaseVolumeCapability_BlockVolume();
    return message;
  },
};

function createBaseVolumeCapability_MountVolume(): VolumeCapability_MountVolume {
  return { fsType: "", mountFlags: [], volumeMountGroup: "" };
}

export const VolumeCapability_MountVolume = {
  encode(message: VolumeCapability_MountVolume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fsType !== "") {
      writer.uint32(10).string(message.fsType);
    }
    for (const v of message.mountFlags) {
      writer.uint32(18).string(v!);
    }
    if (message.volumeMountGroup !== "") {
      writer.uint32(26).string(message.volumeMountGroup);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeCapability_MountVolume {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeCapability_MountVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fsType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mountFlags.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.volumeMountGroup = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeCapability_MountVolume, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeCapability_MountVolume | VolumeCapability_MountVolume[]>
      | Iterable<VolumeCapability_MountVolume | VolumeCapability_MountVolume[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_MountVolume.encode(p).finish()];
        }
      } else {
        yield* [VolumeCapability_MountVolume.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeCapability_MountVolume>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeCapability_MountVolume> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_MountVolume.decode(p)];
        }
      } else {
        yield* [VolumeCapability_MountVolume.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeCapability_MountVolume {
    return {
      fsType: isSet(object.fsType) ? String(object.fsType) : "",
      mountFlags: Array.isArray(object?.mountFlags) ? object.mountFlags.map((e: any) => String(e)) : [],
      volumeMountGroup: isSet(object.volumeMountGroup) ? String(object.volumeMountGroup) : "",
    };
  },

  toJSON(message: VolumeCapability_MountVolume): unknown {
    const obj: any = {};
    message.fsType !== undefined && (obj.fsType = message.fsType);
    if (message.mountFlags) {
      obj.mountFlags = message.mountFlags.map((e) => e);
    } else {
      obj.mountFlags = [];
    }
    message.volumeMountGroup !== undefined && (obj.volumeMountGroup = message.volumeMountGroup);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeCapability_MountVolume>, I>>(base?: I): VolumeCapability_MountVolume {
    return VolumeCapability_MountVolume.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeCapability_MountVolume>, I>>(object: I): VolumeCapability_MountVolume {
    const message = createBaseVolumeCapability_MountVolume();
    message.fsType = object.fsType ?? "";
    message.mountFlags = object.mountFlags?.map((e) => e) || [];
    message.volumeMountGroup = object.volumeMountGroup ?? "";
    return message;
  },
};

function createBaseVolumeCapability_AccessMode(): VolumeCapability_AccessMode {
  return { mode: 0 };
}

export const VolumeCapability_AccessMode = {
  encode(message: VolumeCapability_AccessMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeCapability_AccessMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeCapability_AccessMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeCapability_AccessMode, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeCapability_AccessMode | VolumeCapability_AccessMode[]>
      | Iterable<VolumeCapability_AccessMode | VolumeCapability_AccessMode[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_AccessMode.encode(p).finish()];
        }
      } else {
        yield* [VolumeCapability_AccessMode.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeCapability_AccessMode>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeCapability_AccessMode> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCapability_AccessMode.decode(p)];
        }
      } else {
        yield* [VolumeCapability_AccessMode.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeCapability_AccessMode {
    return { mode: isSet(object.mode) ? volumeCapability_AccessMode_ModeFromJSON(object.mode) : 0 };
  },

  toJSON(message: VolumeCapability_AccessMode): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = volumeCapability_AccessMode_ModeToJSON(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeCapability_AccessMode>, I>>(base?: I): VolumeCapability_AccessMode {
    return VolumeCapability_AccessMode.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeCapability_AccessMode>, I>>(object: I): VolumeCapability_AccessMode {
    const message = createBaseVolumeCapability_AccessMode();
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseCapacityRange(): CapacityRange {
  return { requiredBytes: Long.ZERO, limitBytes: Long.ZERO };
}

export const CapacityRange = {
  encode(message: CapacityRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requiredBytes.isZero()) {
      writer.uint32(8).int64(message.requiredBytes);
    }
    if (!message.limitBytes.isZero()) {
      writer.uint32(16).int64(message.limitBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CapacityRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCapacityRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requiredBytes = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.limitBytes = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CapacityRange, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<CapacityRange | CapacityRange[]> | Iterable<CapacityRange | CapacityRange[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CapacityRange.encode(p).finish()];
        }
      } else {
        yield* [CapacityRange.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CapacityRange>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CapacityRange> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CapacityRange.decode(p)];
        }
      } else {
        yield* [CapacityRange.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CapacityRange {
    return {
      requiredBytes: isSet(object.requiredBytes) ? Long.fromValue(object.requiredBytes) : Long.ZERO,
      limitBytes: isSet(object.limitBytes) ? Long.fromValue(object.limitBytes) : Long.ZERO,
    };
  },

  toJSON(message: CapacityRange): unknown {
    const obj: any = {};
    message.requiredBytes !== undefined && (obj.requiredBytes = (message.requiredBytes || Long.ZERO).toString());
    message.limitBytes !== undefined && (obj.limitBytes = (message.limitBytes || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<CapacityRange>, I>>(base?: I): CapacityRange {
    return CapacityRange.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CapacityRange>, I>>(object: I): CapacityRange {
    const message = createBaseCapacityRange();
    message.requiredBytes = (object.requiredBytes !== undefined && object.requiredBytes !== null)
      ? Long.fromValue(object.requiredBytes)
      : Long.ZERO;
    message.limitBytes = (object.limitBytes !== undefined && object.limitBytes !== null)
      ? Long.fromValue(object.limitBytes)
      : Long.ZERO;
    return message;
  },
};

function createBaseVolume(): Volume {
  return {
    capacityBytes: Long.ZERO,
    volumeId: "",
    volumeContext: {},
    contentSource: undefined,
    accessibleTopology: [],
  };
}

export const Volume = {
  encode(message: Volume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.capacityBytes.isZero()) {
      writer.uint32(8).int64(message.capacityBytes);
    }
    if (message.volumeId !== "") {
      writer.uint32(18).string(message.volumeId);
    }
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      Volume_VolumeContextEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    if (message.contentSource !== undefined) {
      VolumeContentSource.encode(message.contentSource, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.accessibleTopology) {
      Topology.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Volume {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.capacityBytes = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = Volume_VolumeContextEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.volumeContext[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contentSource = VolumeContentSource.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.accessibleTopology.push(Topology.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Volume, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<Volume | Volume[]> | Iterable<Volume | Volume[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Volume.encode(p).finish()];
        }
      } else {
        yield* [Volume.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Volume>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Volume> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Volume.decode(p)];
        }
      } else {
        yield* [Volume.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Volume {
    return {
      capacityBytes: isSet(object.capacityBytes) ? Long.fromValue(object.capacityBytes) : Long.ZERO,
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      contentSource: isSet(object.contentSource) ? VolumeContentSource.fromJSON(object.contentSource) : undefined,
      accessibleTopology: Array.isArray(object?.accessibleTopology)
        ? object.accessibleTopology.map((e: any) => Topology.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Volume): unknown {
    const obj: any = {};
    message.capacityBytes !== undefined && (obj.capacityBytes = (message.capacityBytes || Long.ZERO).toString());
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    message.contentSource !== undefined &&
      (obj.contentSource = message.contentSource ? VolumeContentSource.toJSON(message.contentSource) : undefined);
    if (message.accessibleTopology) {
      obj.accessibleTopology = message.accessibleTopology.map((e) => e ? Topology.toJSON(e) : undefined);
    } else {
      obj.accessibleTopology = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Volume>, I>>(base?: I): Volume {
    return Volume.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Volume>, I>>(object: I): Volume {
    const message = createBaseVolume();
    message.capacityBytes = (object.capacityBytes !== undefined && object.capacityBytes !== null)
      ? Long.fromValue(object.capacityBytes)
      : Long.ZERO;
    message.volumeId = object.volumeId ?? "";
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.contentSource = (object.contentSource !== undefined && object.contentSource !== null)
      ? VolumeContentSource.fromPartial(object.contentSource)
      : undefined;
    message.accessibleTopology = object.accessibleTopology?.map((e) => Topology.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVolume_VolumeContextEntry(): Volume_VolumeContextEntry {
  return { key: "", value: "" };
}

export const Volume_VolumeContextEntry = {
  encode(message: Volume_VolumeContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Volume_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolume_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Volume_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<Volume_VolumeContextEntry | Volume_VolumeContextEntry[]>
      | Iterable<Volume_VolumeContextEntry | Volume_VolumeContextEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Volume_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [Volume_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Volume_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Volume_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Volume_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [Volume_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Volume_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Volume_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Volume_VolumeContextEntry>, I>>(base?: I): Volume_VolumeContextEntry {
    return Volume_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Volume_VolumeContextEntry>, I>>(object: I): Volume_VolumeContextEntry {
    const message = createBaseVolume_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseTopologyRequirement(): TopologyRequirement {
  return { requisite: [], preferred: [] };
}

export const TopologyRequirement = {
  encode(message: TopologyRequirement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.requisite) {
      Topology.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.preferred) {
      Topology.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TopologyRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTopologyRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.requisite.push(Topology.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.preferred.push(Topology.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<TopologyRequirement, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<TopologyRequirement | TopologyRequirement[]>
      | Iterable<TopologyRequirement | TopologyRequirement[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [TopologyRequirement.encode(p).finish()];
        }
      } else {
        yield* [TopologyRequirement.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, TopologyRequirement>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<TopologyRequirement> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [TopologyRequirement.decode(p)];
        }
      } else {
        yield* [TopologyRequirement.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): TopologyRequirement {
    return {
      requisite: Array.isArray(object?.requisite) ? object.requisite.map((e: any) => Topology.fromJSON(e)) : [],
      preferred: Array.isArray(object?.preferred) ? object.preferred.map((e: any) => Topology.fromJSON(e)) : [],
    };
  },

  toJSON(message: TopologyRequirement): unknown {
    const obj: any = {};
    if (message.requisite) {
      obj.requisite = message.requisite.map((e) => e ? Topology.toJSON(e) : undefined);
    } else {
      obj.requisite = [];
    }
    if (message.preferred) {
      obj.preferred = message.preferred.map((e) => e ? Topology.toJSON(e) : undefined);
    } else {
      obj.preferred = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TopologyRequirement>, I>>(base?: I): TopologyRequirement {
    return TopologyRequirement.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TopologyRequirement>, I>>(object: I): TopologyRequirement {
    const message = createBaseTopologyRequirement();
    message.requisite = object.requisite?.map((e) => Topology.fromPartial(e)) || [];
    message.preferred = object.preferred?.map((e) => Topology.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTopology(): Topology {
  return { segments: {} };
}

export const Topology = {
  encode(message: Topology, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.segments).forEach(([key, value]) => {
      Topology_SegmentsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Topology {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTopology();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Topology_SegmentsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.segments[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Topology, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<Topology | Topology[]> | Iterable<Topology | Topology[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Topology.encode(p).finish()];
        }
      } else {
        yield* [Topology.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Topology>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Topology> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Topology.decode(p)];
        }
      } else {
        yield* [Topology.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Topology {
    return {
      segments: isObject(object.segments)
        ? Object.entries(object.segments).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Topology): unknown {
    const obj: any = {};
    obj.segments = {};
    if (message.segments) {
      Object.entries(message.segments).forEach(([k, v]) => {
        obj.segments[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Topology>, I>>(base?: I): Topology {
    return Topology.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Topology>, I>>(object: I): Topology {
    const message = createBaseTopology();
    message.segments = Object.entries(object.segments ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseTopology_SegmentsEntry(): Topology_SegmentsEntry {
  return { key: "", value: "" };
}

export const Topology_SegmentsEntry = {
  encode(message: Topology_SegmentsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Topology_SegmentsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTopology_SegmentsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Topology_SegmentsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<Topology_SegmentsEntry | Topology_SegmentsEntry[]>
      | Iterable<Topology_SegmentsEntry | Topology_SegmentsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Topology_SegmentsEntry.encode(p).finish()];
        }
      } else {
        yield* [Topology_SegmentsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Topology_SegmentsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Topology_SegmentsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Topology_SegmentsEntry.decode(p)];
        }
      } else {
        yield* [Topology_SegmentsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Topology_SegmentsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Topology_SegmentsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Topology_SegmentsEntry>, I>>(base?: I): Topology_SegmentsEntry {
    return Topology_SegmentsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Topology_SegmentsEntry>, I>>(object: I): Topology_SegmentsEntry {
    const message = createBaseTopology_SegmentsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteVolumeRequest(): DeleteVolumeRequest {
  return { volumeId: "", secrets: {} };
}

export const DeleteVolumeRequest = {
  encode(message: DeleteVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      DeleteVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = DeleteVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.secrets[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeRequest | DeleteVolumeRequest[]>
      | Iterable<DeleteVolumeRequest | DeleteVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeRequest.decode(p)];
        }
      } else {
        yield* [DeleteVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DeleteVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeRequest>, I>>(base?: I): DeleteVolumeRequest {
    return DeleteVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeRequest>, I>>(object: I): DeleteVolumeRequest {
    const message = createBaseDeleteVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseDeleteVolumeRequest_SecretsEntry(): DeleteVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const DeleteVolumeRequest_SecretsEntry = {
  encode(message: DeleteVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeRequest_SecretsEntry | DeleteVolumeRequest_SecretsEntry[]>
      | Iterable<DeleteVolumeRequest_SecretsEntry | DeleteVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [DeleteVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: DeleteVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): DeleteVolumeRequest_SecretsEntry {
    return DeleteVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): DeleteVolumeRequest_SecretsEntry {
    const message = createBaseDeleteVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteVolumeResponse(): DeleteVolumeResponse {
  return {};
}

export const DeleteVolumeResponse = {
  encode(_: DeleteVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeResponse | DeleteVolumeResponse[]>
      | Iterable<DeleteVolumeResponse | DeleteVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeResponse.decode(p)];
        }
      } else {
        yield* [DeleteVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): DeleteVolumeResponse {
    return {};
  },

  toJSON(_: DeleteVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeResponse>, I>>(base?: I): DeleteVolumeResponse {
    return DeleteVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeResponse>, I>>(_: I): DeleteVolumeResponse {
    const message = createBaseDeleteVolumeResponse();
    return message;
  },
};

function createBaseControllerPublishVolumeRequest(): ControllerPublishVolumeRequest {
  return { volumeId: "", nodeId: "", volumeCapability: undefined, readonly: false, secrets: {}, volumeContext: {} };
}

export const ControllerPublishVolumeRequest = {
  encode(message: ControllerPublishVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    if (message.volumeCapability !== undefined) {
      VolumeCapability.encode(message.volumeCapability, writer.uint32(26).fork()).ldelim();
    }
    if (message.readonly === true) {
      writer.uint32(32).bool(message.readonly);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      ControllerPublishVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      ControllerPublishVolumeRequest_VolumeContextEntry.encode({ key: key as any, value }, writer.uint32(50).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerPublishVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerPublishVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.volumeCapability = VolumeCapability.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.readonly = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = ControllerPublishVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.secrets[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = ControllerPublishVolumeRequest_VolumeContextEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.volumeContext[entry6.key] = entry6.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerPublishVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerPublishVolumeRequest | ControllerPublishVolumeRequest[]>
      | Iterable<ControllerPublishVolumeRequest | ControllerPublishVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [ControllerPublishVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerPublishVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerPublishVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest.decode(p)];
        }
      } else {
        yield* [ControllerPublishVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerPublishVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      volumeCapability: isSet(object.volumeCapability) ? VolumeCapability.fromJSON(object.volumeCapability) : undefined,
      readonly: isSet(object.readonly) ? Boolean(object.readonly) : false,
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ControllerPublishVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.volumeCapability !== undefined &&
      (obj.volumeCapability = message.volumeCapability ? VolumeCapability.toJSON(message.volumeCapability) : undefined);
    message.readonly !== undefined && (obj.readonly = message.readonly);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerPublishVolumeRequest>, I>>(base?: I): ControllerPublishVolumeRequest {
    return ControllerPublishVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerPublishVolumeRequest>, I>>(
    object: I,
  ): ControllerPublishVolumeRequest {
    const message = createBaseControllerPublishVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.nodeId = object.nodeId ?? "";
    message.volumeCapability = (object.volumeCapability !== undefined && object.volumeCapability !== null)
      ? VolumeCapability.fromPartial(object.volumeCapability)
      : undefined;
    message.readonly = object.readonly ?? false;
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseControllerPublishVolumeRequest_SecretsEntry(): ControllerPublishVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const ControllerPublishVolumeRequest_SecretsEntry = {
  encode(message: ControllerPublishVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerPublishVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerPublishVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerPublishVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerPublishVolumeRequest_SecretsEntry | ControllerPublishVolumeRequest_SecretsEntry[]>
      | Iterable<ControllerPublishVolumeRequest_SecretsEntry | ControllerPublishVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [ControllerPublishVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerPublishVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerPublishVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [ControllerPublishVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerPublishVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ControllerPublishVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerPublishVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): ControllerPublishVolumeRequest_SecretsEntry {
    return ControllerPublishVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerPublishVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): ControllerPublishVolumeRequest_SecretsEntry {
    const message = createBaseControllerPublishVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseControllerPublishVolumeRequest_VolumeContextEntry(): ControllerPublishVolumeRequest_VolumeContextEntry {
  return { key: "", value: "" };
}

export const ControllerPublishVolumeRequest_VolumeContextEntry = {
  encode(
    message: ControllerPublishVolumeRequest_VolumeContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerPublishVolumeRequest_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerPublishVolumeRequest_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerPublishVolumeRequest_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        ControllerPublishVolumeRequest_VolumeContextEntry | ControllerPublishVolumeRequest_VolumeContextEntry[]
      >
      | Iterable<
        ControllerPublishVolumeRequest_VolumeContextEntry | ControllerPublishVolumeRequest_VolumeContextEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [ControllerPublishVolumeRequest_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerPublishVolumeRequest_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerPublishVolumeRequest_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeRequest_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [ControllerPublishVolumeRequest_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerPublishVolumeRequest_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ControllerPublishVolumeRequest_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerPublishVolumeRequest_VolumeContextEntry>, I>>(
    base?: I,
  ): ControllerPublishVolumeRequest_VolumeContextEntry {
    return ControllerPublishVolumeRequest_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerPublishVolumeRequest_VolumeContextEntry>, I>>(
    object: I,
  ): ControllerPublishVolumeRequest_VolumeContextEntry {
    const message = createBaseControllerPublishVolumeRequest_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseControllerPublishVolumeResponse(): ControllerPublishVolumeResponse {
  return { publishContext: {} };
}

export const ControllerPublishVolumeResponse = {
  encode(message: ControllerPublishVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.publishContext).forEach(([key, value]) => {
      ControllerPublishVolumeResponse_PublishContextEntry.encode({ key: key as any, value }, writer.uint32(10).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerPublishVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerPublishVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ControllerPublishVolumeResponse_PublishContextEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.publishContext[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerPublishVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerPublishVolumeResponse | ControllerPublishVolumeResponse[]>
      | Iterable<ControllerPublishVolumeResponse | ControllerPublishVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [ControllerPublishVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerPublishVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerPublishVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeResponse.decode(p)];
        }
      } else {
        yield* [ControllerPublishVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerPublishVolumeResponse {
    return {
      publishContext: isObject(object.publishContext)
        ? Object.entries(object.publishContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ControllerPublishVolumeResponse): unknown {
    const obj: any = {};
    obj.publishContext = {};
    if (message.publishContext) {
      Object.entries(message.publishContext).forEach(([k, v]) => {
        obj.publishContext[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerPublishVolumeResponse>, I>>(base?: I): ControllerPublishVolumeResponse {
    return ControllerPublishVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerPublishVolumeResponse>, I>>(
    object: I,
  ): ControllerPublishVolumeResponse {
    const message = createBaseControllerPublishVolumeResponse();
    message.publishContext = Object.entries(object.publishContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseControllerPublishVolumeResponse_PublishContextEntry(): ControllerPublishVolumeResponse_PublishContextEntry {
  return { key: "", value: "" };
}

export const ControllerPublishVolumeResponse_PublishContextEntry = {
  encode(
    message: ControllerPublishVolumeResponse_PublishContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerPublishVolumeResponse_PublishContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerPublishVolumeResponse_PublishContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerPublishVolumeResponse_PublishContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        ControllerPublishVolumeResponse_PublishContextEntry | ControllerPublishVolumeResponse_PublishContextEntry[]
      >
      | Iterable<
        ControllerPublishVolumeResponse_PublishContextEntry | ControllerPublishVolumeResponse_PublishContextEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeResponse_PublishContextEntry.encode(p).finish()];
        }
      } else {
        yield* [ControllerPublishVolumeResponse_PublishContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerPublishVolumeResponse_PublishContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerPublishVolumeResponse_PublishContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerPublishVolumeResponse_PublishContextEntry.decode(p)];
        }
      } else {
        yield* [ControllerPublishVolumeResponse_PublishContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerPublishVolumeResponse_PublishContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ControllerPublishVolumeResponse_PublishContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerPublishVolumeResponse_PublishContextEntry>, I>>(
    base?: I,
  ): ControllerPublishVolumeResponse_PublishContextEntry {
    return ControllerPublishVolumeResponse_PublishContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerPublishVolumeResponse_PublishContextEntry>, I>>(
    object: I,
  ): ControllerPublishVolumeResponse_PublishContextEntry {
    const message = createBaseControllerPublishVolumeResponse_PublishContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseControllerUnpublishVolumeRequest(): ControllerUnpublishVolumeRequest {
  return { volumeId: "", nodeId: "", secrets: {} };
}

export const ControllerUnpublishVolumeRequest = {
  encode(message: ControllerUnpublishVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      ControllerUnpublishVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerUnpublishVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerUnpublishVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ControllerUnpublishVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerUnpublishVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerUnpublishVolumeRequest | ControllerUnpublishVolumeRequest[]>
      | Iterable<ControllerUnpublishVolumeRequest | ControllerUnpublishVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [ControllerUnpublishVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerUnpublishVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerUnpublishVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeRequest.decode(p)];
        }
      } else {
        yield* [ControllerUnpublishVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerUnpublishVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ControllerUnpublishVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerUnpublishVolumeRequest>, I>>(
    base?: I,
  ): ControllerUnpublishVolumeRequest {
    return ControllerUnpublishVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerUnpublishVolumeRequest>, I>>(
    object: I,
  ): ControllerUnpublishVolumeRequest {
    const message = createBaseControllerUnpublishVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.nodeId = object.nodeId ?? "";
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseControllerUnpublishVolumeRequest_SecretsEntry(): ControllerUnpublishVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const ControllerUnpublishVolumeRequest_SecretsEntry = {
  encode(message: ControllerUnpublishVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerUnpublishVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerUnpublishVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerUnpublishVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerUnpublishVolumeRequest_SecretsEntry | ControllerUnpublishVolumeRequest_SecretsEntry[]>
      | Iterable<ControllerUnpublishVolumeRequest_SecretsEntry | ControllerUnpublishVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [ControllerUnpublishVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerUnpublishVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerUnpublishVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [ControllerUnpublishVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerUnpublishVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ControllerUnpublishVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerUnpublishVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): ControllerUnpublishVolumeRequest_SecretsEntry {
    return ControllerUnpublishVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerUnpublishVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): ControllerUnpublishVolumeRequest_SecretsEntry {
    const message = createBaseControllerUnpublishVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseControllerUnpublishVolumeResponse(): ControllerUnpublishVolumeResponse {
  return {};
}

export const ControllerUnpublishVolumeResponse = {
  encode(_: ControllerUnpublishVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerUnpublishVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerUnpublishVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerUnpublishVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerUnpublishVolumeResponse | ControllerUnpublishVolumeResponse[]>
      | Iterable<ControllerUnpublishVolumeResponse | ControllerUnpublishVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [ControllerUnpublishVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerUnpublishVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerUnpublishVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerUnpublishVolumeResponse.decode(p)];
        }
      } else {
        yield* [ControllerUnpublishVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): ControllerUnpublishVolumeResponse {
    return {};
  },

  toJSON(_: ControllerUnpublishVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerUnpublishVolumeResponse>, I>>(
    base?: I,
  ): ControllerUnpublishVolumeResponse {
    return ControllerUnpublishVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerUnpublishVolumeResponse>, I>>(
    _: I,
  ): ControllerUnpublishVolumeResponse {
    const message = createBaseControllerUnpublishVolumeResponse();
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesRequest(): ValidateVolumeCapabilitiesRequest {
  return { volumeId: "", volumeContext: {}, volumeCapabilities: [], parameters: {}, secrets: {} };
}

export const ValidateVolumeCapabilitiesRequest = {
  encode(message: ValidateVolumeCapabilitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      ValidateVolumeCapabilitiesRequest_VolumeContextEntry.encode({ key: key as any, value }, writer.uint32(18).fork())
        .ldelim();
    });
    for (const v of message.volumeCapabilities) {
      VolumeCapability.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      ValidateVolumeCapabilitiesRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork())
        .ldelim();
    });
    Object.entries(message.secrets).forEach(([key, value]) => {
      ValidateVolumeCapabilitiesRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(42).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = ValidateVolumeCapabilitiesRequest_VolumeContextEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.volumeContext[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.volumeCapabilities.push(VolumeCapability.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ValidateVolumeCapabilitiesRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = ValidateVolumeCapabilitiesRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.secrets[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ValidateVolumeCapabilitiesRequest | ValidateVolumeCapabilitiesRequest[]>
      | Iterable<ValidateVolumeCapabilitiesRequest | ValidateVolumeCapabilitiesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeCapabilities: Array.isArray(object?.volumeCapabilities)
        ? object.volumeCapabilities.map((e: any) => VolumeCapability.fromJSON(e))
        : [],
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ValidateVolumeCapabilitiesRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    if (message.volumeCapabilities) {
      obj.volumeCapabilities = message.volumeCapabilities.map((e) => e ? VolumeCapability.toJSON(e) : undefined);
    } else {
      obj.volumeCapabilities = [];
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesRequest {
    return ValidateVolumeCapabilitiesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesRequest {
    const message = createBaseValidateVolumeCapabilitiesRequest();
    message.volumeId = object.volumeId ?? "";
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.volumeCapabilities = object.volumeCapabilities?.map((e) => VolumeCapability.fromPartial(e)) || [];
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesRequest_VolumeContextEntry(): ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
  return { key: "", value: "" };
}

export const ValidateVolumeCapabilitiesRequest_VolumeContextEntry = {
  encode(
    message: ValidateVolumeCapabilitiesRequest_VolumeContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesRequest_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesRequest_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        ValidateVolumeCapabilitiesRequest_VolumeContextEntry | ValidateVolumeCapabilitiesRequest_VolumeContextEntry[]
      >
      | Iterable<
        ValidateVolumeCapabilitiesRequest_VolumeContextEntry | ValidateVolumeCapabilitiesRequest_VolumeContextEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesRequest_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesRequest_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ValidateVolumeCapabilitiesRequest_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_VolumeContextEntry>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
    return ValidateVolumeCapabilitiesRequest_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_VolumeContextEntry>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesRequest_VolumeContextEntry {
    const message = createBaseValidateVolumeCapabilitiesRequest_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesRequest_ParametersEntry(): ValidateVolumeCapabilitiesRequest_ParametersEntry {
  return { key: "", value: "" };
}

export const ValidateVolumeCapabilitiesRequest_ParametersEntry = {
  encode(
    message: ValidateVolumeCapabilitiesRequest_ParametersEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesRequest_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesRequest_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        ValidateVolumeCapabilitiesRequest_ParametersEntry | ValidateVolumeCapabilitiesRequest_ParametersEntry[]
      >
      | Iterable<
        ValidateVolumeCapabilitiesRequest_ParametersEntry | ValidateVolumeCapabilitiesRequest_ParametersEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesRequest_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesRequest_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_ParametersEntry.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesRequest_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ValidateVolumeCapabilitiesRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_ParametersEntry>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesRequest_ParametersEntry {
    return ValidateVolumeCapabilitiesRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_ParametersEntry>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesRequest_ParametersEntry {
    const message = createBaseValidateVolumeCapabilitiesRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesRequest_SecretsEntry(): ValidateVolumeCapabilitiesRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const ValidateVolumeCapabilitiesRequest_SecretsEntry = {
  encode(
    message: ValidateVolumeCapabilitiesRequest_SecretsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ValidateVolumeCapabilitiesRequest_SecretsEntry | ValidateVolumeCapabilitiesRequest_SecretsEntry[]>
      | Iterable<ValidateVolumeCapabilitiesRequest_SecretsEntry | ValidateVolumeCapabilitiesRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ValidateVolumeCapabilitiesRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_SecretsEntry>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesRequest_SecretsEntry {
    return ValidateVolumeCapabilitiesRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesRequest_SecretsEntry>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesRequest_SecretsEntry {
    const message = createBaseValidateVolumeCapabilitiesRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesResponse(): ValidateVolumeCapabilitiesResponse {
  return { confirmed: undefined, message: "" };
}

export const ValidateVolumeCapabilitiesResponse = {
  encode(message: ValidateVolumeCapabilitiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.confirmed !== undefined) {
      ValidateVolumeCapabilitiesResponse_Confirmed.encode(message.confirmed, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.confirmed = ValidateVolumeCapabilitiesResponse_Confirmed.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ValidateVolumeCapabilitiesResponse | ValidateVolumeCapabilitiesResponse[]>
      | Iterable<ValidateVolumeCapabilitiesResponse | ValidateVolumeCapabilitiesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesResponse {
    return {
      confirmed: isSet(object.confirmed)
        ? ValidateVolumeCapabilitiesResponse_Confirmed.fromJSON(object.confirmed)
        : undefined,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: ValidateVolumeCapabilitiesResponse): unknown {
    const obj: any = {};
    message.confirmed !== undefined &&
      (obj.confirmed = message.confirmed
        ? ValidateVolumeCapabilitiesResponse_Confirmed.toJSON(message.confirmed)
        : undefined);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesResponse {
    return ValidateVolumeCapabilitiesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesResponse {
    const message = createBaseValidateVolumeCapabilitiesResponse();
    message.confirmed = (object.confirmed !== undefined && object.confirmed !== null)
      ? ValidateVolumeCapabilitiesResponse_Confirmed.fromPartial(object.confirmed)
      : undefined;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesResponse_Confirmed(): ValidateVolumeCapabilitiesResponse_Confirmed {
  return { volumeContext: {}, volumeCapabilities: [], parameters: {} };
}

export const ValidateVolumeCapabilitiesResponse_Confirmed = {
  encode(message: ValidateVolumeCapabilitiesResponse_Confirmed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    for (const v of message.volumeCapabilities) {
      VolumeCapability.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateVolumeCapabilitiesResponse_Confirmed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry1.value !== undefined) {
            message.volumeContext[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumeCapabilities.push(VolumeCapability.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.parameters[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesResponse_Confirmed, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ValidateVolumeCapabilitiesResponse_Confirmed | ValidateVolumeCapabilitiesResponse_Confirmed[]>
      | Iterable<ValidateVolumeCapabilitiesResponse_Confirmed | ValidateVolumeCapabilitiesResponse_Confirmed[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesResponse_Confirmed>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesResponse_Confirmed> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesResponse_Confirmed {
    return {
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeCapabilities: Array.isArray(object?.volumeCapabilities)
        ? object.volumeCapabilities.map((e: any) => VolumeCapability.fromJSON(e))
        : [],
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ValidateVolumeCapabilitiesResponse_Confirmed): unknown {
    const obj: any = {};
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    if (message.volumeCapabilities) {
      obj.volumeCapabilities = message.volumeCapabilities.map((e) => e ? VolumeCapability.toJSON(e) : undefined);
    } else {
      obj.volumeCapabilities = [];
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed {
    return ValidateVolumeCapabilitiesResponse_Confirmed.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed {
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed();
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.volumeCapabilities = object.volumeCapabilities?.map((e) => VolumeCapability.fromPartial(e)) || [];
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry(): ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
  return { key: "", value: "" };
}

export const ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry = {
  encode(
    message: ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        | ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry
        | ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry[]
      >
      | Iterable<
        | ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry
        | ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
    return ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry {
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry(): ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
  return { key: "", value: "" };
}

export const ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry = {
  encode(
    message: ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        | ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry
        | ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry[]
      >
      | Iterable<
        | ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry
        | ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry[]
      >,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.decode(p)];
        }
      } else {
        yield* [ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry>, I>>(
    base?: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
    return ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry>, I>>(
    object: I,
  ): ValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry {
    const message = createBaseValidateVolumeCapabilitiesResponse_Confirmed_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseListVolumesRequest(): ListVolumesRequest {
  return { maxEntries: 0, startingToken: "" };
}

export const ListVolumesRequest = {
  encode(message: ListVolumesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxEntries !== 0) {
      writer.uint32(8).int32(message.maxEntries);
    }
    if (message.startingToken !== "") {
      writer.uint32(18).string(message.startingToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListVolumesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListVolumesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxEntries = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startingToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListVolumesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListVolumesRequest | ListVolumesRequest[]>
      | Iterable<ListVolumesRequest | ListVolumesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesRequest.encode(p).finish()];
        }
      } else {
        yield* [ListVolumesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListVolumesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListVolumesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesRequest.decode(p)];
        }
      } else {
        yield* [ListVolumesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListVolumesRequest {
    return {
      maxEntries: isSet(object.maxEntries) ? Number(object.maxEntries) : 0,
      startingToken: isSet(object.startingToken) ? String(object.startingToken) : "",
    };
  },

  toJSON(message: ListVolumesRequest): unknown {
    const obj: any = {};
    message.maxEntries !== undefined && (obj.maxEntries = Math.round(message.maxEntries));
    message.startingToken !== undefined && (obj.startingToken = message.startingToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListVolumesRequest>, I>>(base?: I): ListVolumesRequest {
    return ListVolumesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListVolumesRequest>, I>>(object: I): ListVolumesRequest {
    const message = createBaseListVolumesRequest();
    message.maxEntries = object.maxEntries ?? 0;
    message.startingToken = object.startingToken ?? "";
    return message;
  },
};

function createBaseListVolumesResponse(): ListVolumesResponse {
  return { entries: [], nextToken: "" };
}

export const ListVolumesResponse = {
  encode(message: ListVolumesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      ListVolumesResponse_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextToken !== "") {
      writer.uint32(18).string(message.nextToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListVolumesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListVolumesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entries.push(ListVolumesResponse_Entry.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListVolumesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListVolumesResponse | ListVolumesResponse[]>
      | Iterable<ListVolumesResponse | ListVolumesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse.encode(p).finish()];
        }
      } else {
        yield* [ListVolumesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListVolumesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListVolumesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse.decode(p)];
        }
      } else {
        yield* [ListVolumesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListVolumesResponse {
    return {
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => ListVolumesResponse_Entry.fromJSON(e))
        : [],
      nextToken: isSet(object.nextToken) ? String(object.nextToken) : "",
    };
  },

  toJSON(message: ListVolumesResponse): unknown {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map((e) => e ? ListVolumesResponse_Entry.toJSON(e) : undefined);
    } else {
      obj.entries = [];
    }
    message.nextToken !== undefined && (obj.nextToken = message.nextToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListVolumesResponse>, I>>(base?: I): ListVolumesResponse {
    return ListVolumesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListVolumesResponse>, I>>(object: I): ListVolumesResponse {
    const message = createBaseListVolumesResponse();
    message.entries = object.entries?.map((e) => ListVolumesResponse_Entry.fromPartial(e)) || [];
    message.nextToken = object.nextToken ?? "";
    return message;
  },
};

function createBaseListVolumesResponse_VolumeStatus(): ListVolumesResponse_VolumeStatus {
  return { publishedNodeIds: [], volumeCondition: undefined };
}

export const ListVolumesResponse_VolumeStatus = {
  encode(message: ListVolumesResponse_VolumeStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.publishedNodeIds) {
      writer.uint32(10).string(v!);
    }
    if (message.volumeCondition !== undefined) {
      VolumeCondition.encode(message.volumeCondition, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListVolumesResponse_VolumeStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListVolumesResponse_VolumeStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publishedNodeIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumeCondition = VolumeCondition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListVolumesResponse_VolumeStatus, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListVolumesResponse_VolumeStatus | ListVolumesResponse_VolumeStatus[]>
      | Iterable<ListVolumesResponse_VolumeStatus | ListVolumesResponse_VolumeStatus[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse_VolumeStatus.encode(p).finish()];
        }
      } else {
        yield* [ListVolumesResponse_VolumeStatus.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListVolumesResponse_VolumeStatus>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListVolumesResponse_VolumeStatus> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse_VolumeStatus.decode(p)];
        }
      } else {
        yield* [ListVolumesResponse_VolumeStatus.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListVolumesResponse_VolumeStatus {
    return {
      publishedNodeIds: Array.isArray(object?.publishedNodeIds)
        ? object.publishedNodeIds.map((e: any) => String(e))
        : [],
      volumeCondition: isSet(object.volumeCondition) ? VolumeCondition.fromJSON(object.volumeCondition) : undefined,
    };
  },

  toJSON(message: ListVolumesResponse_VolumeStatus): unknown {
    const obj: any = {};
    if (message.publishedNodeIds) {
      obj.publishedNodeIds = message.publishedNodeIds.map((e) => e);
    } else {
      obj.publishedNodeIds = [];
    }
    message.volumeCondition !== undefined &&
      (obj.volumeCondition = message.volumeCondition ? VolumeCondition.toJSON(message.volumeCondition) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListVolumesResponse_VolumeStatus>, I>>(
    base?: I,
  ): ListVolumesResponse_VolumeStatus {
    return ListVolumesResponse_VolumeStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListVolumesResponse_VolumeStatus>, I>>(
    object: I,
  ): ListVolumesResponse_VolumeStatus {
    const message = createBaseListVolumesResponse_VolumeStatus();
    message.publishedNodeIds = object.publishedNodeIds?.map((e) => e) || [];
    message.volumeCondition = (object.volumeCondition !== undefined && object.volumeCondition !== null)
      ? VolumeCondition.fromPartial(object.volumeCondition)
      : undefined;
    return message;
  },
};

function createBaseListVolumesResponse_Entry(): ListVolumesResponse_Entry {
  return { volume: undefined, status: undefined };
}

export const ListVolumesResponse_Entry = {
  encode(message: ListVolumesResponse_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      ListVolumesResponse_VolumeStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListVolumesResponse_Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListVolumesResponse_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volume = Volume.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = ListVolumesResponse_VolumeStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListVolumesResponse_Entry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListVolumesResponse_Entry | ListVolumesResponse_Entry[]>
      | Iterable<ListVolumesResponse_Entry | ListVolumesResponse_Entry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse_Entry.encode(p).finish()];
        }
      } else {
        yield* [ListVolumesResponse_Entry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListVolumesResponse_Entry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListVolumesResponse_Entry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListVolumesResponse_Entry.decode(p)];
        }
      } else {
        yield* [ListVolumesResponse_Entry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListVolumesResponse_Entry {
    return {
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      status: isSet(object.status) ? ListVolumesResponse_VolumeStatus.fromJSON(object.status) : undefined,
    };
  },

  toJSON(message: ListVolumesResponse_Entry): unknown {
    const obj: any = {};
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.status !== undefined &&
      (obj.status = message.status ? ListVolumesResponse_VolumeStatus.toJSON(message.status) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListVolumesResponse_Entry>, I>>(base?: I): ListVolumesResponse_Entry {
    return ListVolumesResponse_Entry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListVolumesResponse_Entry>, I>>(object: I): ListVolumesResponse_Entry {
    const message = createBaseListVolumesResponse_Entry();
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.status = (object.status !== undefined && object.status !== null)
      ? ListVolumesResponse_VolumeStatus.fromPartial(object.status)
      : undefined;
    return message;
  },
};

function createBaseControllerGetVolumeRequest(): ControllerGetVolumeRequest {
  return { volumeId: "" };
}

export const ControllerGetVolumeRequest = {
  encode(message: ControllerGetVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGetVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGetVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerGetVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerGetVolumeRequest | ControllerGetVolumeRequest[]>
      | Iterable<ControllerGetVolumeRequest | ControllerGetVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [ControllerGetVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerGetVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerGetVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeRequest.decode(p)];
        }
      } else {
        yield* [ControllerGetVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerGetVolumeRequest {
    return { volumeId: isSet(object.volumeId) ? String(object.volumeId) : "" };
  },

  toJSON(message: ControllerGetVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGetVolumeRequest>, I>>(base?: I): ControllerGetVolumeRequest {
    return ControllerGetVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGetVolumeRequest>, I>>(object: I): ControllerGetVolumeRequest {
    const message = createBaseControllerGetVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    return message;
  },
};

function createBaseControllerGetVolumeResponse(): ControllerGetVolumeResponse {
  return { volume: undefined, status: undefined };
}

export const ControllerGetVolumeResponse = {
  encode(message: ControllerGetVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      ControllerGetVolumeResponse_VolumeStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGetVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGetVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volume = Volume.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = ControllerGetVolumeResponse_VolumeStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerGetVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerGetVolumeResponse | ControllerGetVolumeResponse[]>
      | Iterable<ControllerGetVolumeResponse | ControllerGetVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [ControllerGetVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerGetVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerGetVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeResponse.decode(p)];
        }
      } else {
        yield* [ControllerGetVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerGetVolumeResponse {
    return {
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      status: isSet(object.status) ? ControllerGetVolumeResponse_VolumeStatus.fromJSON(object.status) : undefined,
    };
  },

  toJSON(message: ControllerGetVolumeResponse): unknown {
    const obj: any = {};
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.status !== undefined &&
      (obj.status = message.status ? ControllerGetVolumeResponse_VolumeStatus.toJSON(message.status) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGetVolumeResponse>, I>>(base?: I): ControllerGetVolumeResponse {
    return ControllerGetVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGetVolumeResponse>, I>>(object: I): ControllerGetVolumeResponse {
    const message = createBaseControllerGetVolumeResponse();
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.status = (object.status !== undefined && object.status !== null)
      ? ControllerGetVolumeResponse_VolumeStatus.fromPartial(object.status)
      : undefined;
    return message;
  },
};

function createBaseControllerGetVolumeResponse_VolumeStatus(): ControllerGetVolumeResponse_VolumeStatus {
  return { publishedNodeIds: [], volumeCondition: undefined };
}

export const ControllerGetVolumeResponse_VolumeStatus = {
  encode(message: ControllerGetVolumeResponse_VolumeStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.publishedNodeIds) {
      writer.uint32(10).string(v!);
    }
    if (message.volumeCondition !== undefined) {
      VolumeCondition.encode(message.volumeCondition, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGetVolumeResponse_VolumeStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGetVolumeResponse_VolumeStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publishedNodeIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumeCondition = VolumeCondition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerGetVolumeResponse_VolumeStatus, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerGetVolumeResponse_VolumeStatus | ControllerGetVolumeResponse_VolumeStatus[]>
      | Iterable<ControllerGetVolumeResponse_VolumeStatus | ControllerGetVolumeResponse_VolumeStatus[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeResponse_VolumeStatus.encode(p).finish()];
        }
      } else {
        yield* [ControllerGetVolumeResponse_VolumeStatus.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerGetVolumeResponse_VolumeStatus>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerGetVolumeResponse_VolumeStatus> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetVolumeResponse_VolumeStatus.decode(p)];
        }
      } else {
        yield* [ControllerGetVolumeResponse_VolumeStatus.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerGetVolumeResponse_VolumeStatus {
    return {
      publishedNodeIds: Array.isArray(object?.publishedNodeIds)
        ? object.publishedNodeIds.map((e: any) => String(e))
        : [],
      volumeCondition: isSet(object.volumeCondition) ? VolumeCondition.fromJSON(object.volumeCondition) : undefined,
    };
  },

  toJSON(message: ControllerGetVolumeResponse_VolumeStatus): unknown {
    const obj: any = {};
    if (message.publishedNodeIds) {
      obj.publishedNodeIds = message.publishedNodeIds.map((e) => e);
    } else {
      obj.publishedNodeIds = [];
    }
    message.volumeCondition !== undefined &&
      (obj.volumeCondition = message.volumeCondition ? VolumeCondition.toJSON(message.volumeCondition) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGetVolumeResponse_VolumeStatus>, I>>(
    base?: I,
  ): ControllerGetVolumeResponse_VolumeStatus {
    return ControllerGetVolumeResponse_VolumeStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGetVolumeResponse_VolumeStatus>, I>>(
    object: I,
  ): ControllerGetVolumeResponse_VolumeStatus {
    const message = createBaseControllerGetVolumeResponse_VolumeStatus();
    message.publishedNodeIds = object.publishedNodeIds?.map((e) => e) || [];
    message.volumeCondition = (object.volumeCondition !== undefined && object.volumeCondition !== null)
      ? VolumeCondition.fromPartial(object.volumeCondition)
      : undefined;
    return message;
  },
};

function createBaseGetCapacityRequest(): GetCapacityRequest {
  return { volumeCapabilities: [], parameters: {}, accessibleTopology: undefined };
}

export const GetCapacityRequest = {
  encode(message: GetCapacityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.volumeCapabilities) {
      VolumeCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      GetCapacityRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    if (message.accessibleTopology !== undefined) {
      Topology.encode(message.accessibleTopology, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCapacityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCapacityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeCapabilities.push(VolumeCapability.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = GetCapacityRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.parameters[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accessibleTopology = Topology.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetCapacityRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetCapacityRequest | GetCapacityRequest[]>
      | Iterable<GetCapacityRequest | GetCapacityRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityRequest.encode(p).finish()];
        }
      } else {
        yield* [GetCapacityRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetCapacityRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetCapacityRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityRequest.decode(p)];
        }
      } else {
        yield* [GetCapacityRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetCapacityRequest {
    return {
      volumeCapabilities: Array.isArray(object?.volumeCapabilities)
        ? object.volumeCapabilities.map((e: any) => VolumeCapability.fromJSON(e))
        : [],
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      accessibleTopology: isSet(object.accessibleTopology) ? Topology.fromJSON(object.accessibleTopology) : undefined,
    };
  },

  toJSON(message: GetCapacityRequest): unknown {
    const obj: any = {};
    if (message.volumeCapabilities) {
      obj.volumeCapabilities = message.volumeCapabilities.map((e) => e ? VolumeCapability.toJSON(e) : undefined);
    } else {
      obj.volumeCapabilities = [];
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    message.accessibleTopology !== undefined &&
      (obj.accessibleTopology = message.accessibleTopology ? Topology.toJSON(message.accessibleTopology) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCapacityRequest>, I>>(base?: I): GetCapacityRequest {
    return GetCapacityRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetCapacityRequest>, I>>(object: I): GetCapacityRequest {
    const message = createBaseGetCapacityRequest();
    message.volumeCapabilities = object.volumeCapabilities?.map((e) => VolumeCapability.fromPartial(e)) || [];
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.accessibleTopology = (object.accessibleTopology !== undefined && object.accessibleTopology !== null)
      ? Topology.fromPartial(object.accessibleTopology)
      : undefined;
    return message;
  },
};

function createBaseGetCapacityRequest_ParametersEntry(): GetCapacityRequest_ParametersEntry {
  return { key: "", value: "" };
}

export const GetCapacityRequest_ParametersEntry = {
  encode(message: GetCapacityRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCapacityRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCapacityRequest_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetCapacityRequest_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetCapacityRequest_ParametersEntry | GetCapacityRequest_ParametersEntry[]>
      | Iterable<GetCapacityRequest_ParametersEntry | GetCapacityRequest_ParametersEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityRequest_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [GetCapacityRequest_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetCapacityRequest_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetCapacityRequest_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityRequest_ParametersEntry.decode(p)];
        }
      } else {
        yield* [GetCapacityRequest_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetCapacityRequest_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: GetCapacityRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCapacityRequest_ParametersEntry>, I>>(
    base?: I,
  ): GetCapacityRequest_ParametersEntry {
    return GetCapacityRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetCapacityRequest_ParametersEntry>, I>>(
    object: I,
  ): GetCapacityRequest_ParametersEntry {
    const message = createBaseGetCapacityRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetCapacityResponse(): GetCapacityResponse {
  return { availableCapacity: Long.ZERO, maximumVolumeSize: undefined, minimumVolumeSize: undefined };
}

export const GetCapacityResponse = {
  encode(message: GetCapacityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.availableCapacity.isZero()) {
      writer.uint32(8).int64(message.availableCapacity);
    }
    if (message.maximumVolumeSize !== undefined) {
      Int64Value.encode({ value: message.maximumVolumeSize! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.minimumVolumeSize !== undefined) {
      Int64Value.encode({ value: message.minimumVolumeSize! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCapacityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCapacityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.availableCapacity = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.maximumVolumeSize = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.minimumVolumeSize = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetCapacityResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetCapacityResponse | GetCapacityResponse[]>
      | Iterable<GetCapacityResponse | GetCapacityResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityResponse.encode(p).finish()];
        }
      } else {
        yield* [GetCapacityResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetCapacityResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetCapacityResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetCapacityResponse.decode(p)];
        }
      } else {
        yield* [GetCapacityResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetCapacityResponse {
    return {
      availableCapacity: isSet(object.availableCapacity) ? Long.fromValue(object.availableCapacity) : Long.ZERO,
      maximumVolumeSize: isSet(object.maximumVolumeSize) ? Long.fromValue(object.maximumVolumeSize) : undefined,
      minimumVolumeSize: isSet(object.minimumVolumeSize) ? Long.fromValue(object.minimumVolumeSize) : undefined,
    };
  },

  toJSON(message: GetCapacityResponse): unknown {
    const obj: any = {};
    message.availableCapacity !== undefined &&
      (obj.availableCapacity = (message.availableCapacity || Long.ZERO).toString());
    message.maximumVolumeSize !== undefined && (obj.maximumVolumeSize = message.maximumVolumeSize);
    message.minimumVolumeSize !== undefined && (obj.minimumVolumeSize = message.minimumVolumeSize);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCapacityResponse>, I>>(base?: I): GetCapacityResponse {
    return GetCapacityResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetCapacityResponse>, I>>(object: I): GetCapacityResponse {
    const message = createBaseGetCapacityResponse();
    message.availableCapacity = (object.availableCapacity !== undefined && object.availableCapacity !== null)
      ? Long.fromValue(object.availableCapacity)
      : Long.ZERO;
    message.maximumVolumeSize = (object.maximumVolumeSize !== undefined && object.maximumVolumeSize !== null)
      ? Long.fromValue(object.maximumVolumeSize)
      : undefined;
    message.minimumVolumeSize = (object.minimumVolumeSize !== undefined && object.minimumVolumeSize !== null)
      ? Long.fromValue(object.minimumVolumeSize)
      : undefined;
    return message;
  },
};

function createBaseControllerGetCapabilitiesRequest(): ControllerGetCapabilitiesRequest {
  return {};
}

export const ControllerGetCapabilitiesRequest = {
  encode(_: ControllerGetCapabilitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGetCapabilitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGetCapabilitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerGetCapabilitiesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerGetCapabilitiesRequest | ControllerGetCapabilitiesRequest[]>
      | Iterable<ControllerGetCapabilitiesRequest | ControllerGetCapabilitiesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetCapabilitiesRequest.encode(p).finish()];
        }
      } else {
        yield* [ControllerGetCapabilitiesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerGetCapabilitiesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerGetCapabilitiesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetCapabilitiesRequest.decode(p)];
        }
      } else {
        yield* [ControllerGetCapabilitiesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): ControllerGetCapabilitiesRequest {
    return {};
  },

  toJSON(_: ControllerGetCapabilitiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGetCapabilitiesRequest>, I>>(
    base?: I,
  ): ControllerGetCapabilitiesRequest {
    return ControllerGetCapabilitiesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGetCapabilitiesRequest>, I>>(
    _: I,
  ): ControllerGetCapabilitiesRequest {
    const message = createBaseControllerGetCapabilitiesRequest();
    return message;
  },
};

function createBaseControllerGetCapabilitiesResponse(): ControllerGetCapabilitiesResponse {
  return { capabilities: [] };
}

export const ControllerGetCapabilitiesResponse = {
  encode(message: ControllerGetCapabilitiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.capabilities) {
      ControllerServiceCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGetCapabilitiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGetCapabilitiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.capabilities.push(ControllerServiceCapability.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerGetCapabilitiesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerGetCapabilitiesResponse | ControllerGetCapabilitiesResponse[]>
      | Iterable<ControllerGetCapabilitiesResponse | ControllerGetCapabilitiesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetCapabilitiesResponse.encode(p).finish()];
        }
      } else {
        yield* [ControllerGetCapabilitiesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerGetCapabilitiesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerGetCapabilitiesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerGetCapabilitiesResponse.decode(p)];
        }
      } else {
        yield* [ControllerGetCapabilitiesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerGetCapabilitiesResponse {
    return {
      capabilities: Array.isArray(object?.capabilities)
        ? object.capabilities.map((e: any) => ControllerServiceCapability.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ControllerGetCapabilitiesResponse): unknown {
    const obj: any = {};
    if (message.capabilities) {
      obj.capabilities = message.capabilities.map((e) => e ? ControllerServiceCapability.toJSON(e) : undefined);
    } else {
      obj.capabilities = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGetCapabilitiesResponse>, I>>(
    base?: I,
  ): ControllerGetCapabilitiesResponse {
    return ControllerGetCapabilitiesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGetCapabilitiesResponse>, I>>(
    object: I,
  ): ControllerGetCapabilitiesResponse {
    const message = createBaseControllerGetCapabilitiesResponse();
    message.capabilities = object.capabilities?.map((e) => ControllerServiceCapability.fromPartial(e)) || [];
    return message;
  },
};

function createBaseControllerServiceCapability(): ControllerServiceCapability {
  return { type: undefined };
}

export const ControllerServiceCapability = {
  encode(message: ControllerServiceCapability, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.type?.$case) {
      case "rpc":
        ControllerServiceCapability_RPC.encode(message.type.rpc, writer.uint32(10).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerServiceCapability {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerServiceCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = { $case: "rpc", rpc: ControllerServiceCapability_RPC.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerServiceCapability, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerServiceCapability | ControllerServiceCapability[]>
      | Iterable<ControllerServiceCapability | ControllerServiceCapability[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerServiceCapability.encode(p).finish()];
        }
      } else {
        yield* [ControllerServiceCapability.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerServiceCapability>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerServiceCapability> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerServiceCapability.decode(p)];
        }
      } else {
        yield* [ControllerServiceCapability.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerServiceCapability {
    return {
      type: isSet(object.rpc) ? { $case: "rpc", rpc: ControllerServiceCapability_RPC.fromJSON(object.rpc) } : undefined,
    };
  },

  toJSON(message: ControllerServiceCapability): unknown {
    const obj: any = {};
    message.type?.$case === "rpc" &&
      (obj.rpc = message.type?.rpc ? ControllerServiceCapability_RPC.toJSON(message.type?.rpc) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerServiceCapability>, I>>(base?: I): ControllerServiceCapability {
    return ControllerServiceCapability.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerServiceCapability>, I>>(object: I): ControllerServiceCapability {
    const message = createBaseControllerServiceCapability();
    if (object.type?.$case === "rpc" && object.type?.rpc !== undefined && object.type?.rpc !== null) {
      message.type = { $case: "rpc", rpc: ControllerServiceCapability_RPC.fromPartial(object.type.rpc) };
    }
    return message;
  },
};

function createBaseControllerServiceCapability_RPC(): ControllerServiceCapability_RPC {
  return { type: 0 };
}

export const ControllerServiceCapability_RPC = {
  encode(message: ControllerServiceCapability_RPC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerServiceCapability_RPC {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerServiceCapability_RPC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerServiceCapability_RPC, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerServiceCapability_RPC | ControllerServiceCapability_RPC[]>
      | Iterable<ControllerServiceCapability_RPC | ControllerServiceCapability_RPC[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerServiceCapability_RPC.encode(p).finish()];
        }
      } else {
        yield* [ControllerServiceCapability_RPC.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerServiceCapability_RPC>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerServiceCapability_RPC> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerServiceCapability_RPC.decode(p)];
        }
      } else {
        yield* [ControllerServiceCapability_RPC.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerServiceCapability_RPC {
    return { type: isSet(object.type) ? controllerServiceCapability_RPC_TypeFromJSON(object.type) : 0 };
  },

  toJSON(message: ControllerServiceCapability_RPC): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = controllerServiceCapability_RPC_TypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerServiceCapability_RPC>, I>>(base?: I): ControllerServiceCapability_RPC {
    return ControllerServiceCapability_RPC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerServiceCapability_RPC>, I>>(
    object: I,
  ): ControllerServiceCapability_RPC {
    const message = createBaseControllerServiceCapability_RPC();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseCreateSnapshotRequest(): CreateSnapshotRequest {
  return { sourceVolumeId: "", name: "", secrets: {}, parameters: {} };
}

export const CreateSnapshotRequest = {
  encode(message: CreateSnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceVolumeId !== "") {
      writer.uint32(10).string(message.sourceVolumeId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      CreateSnapshotRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.parameters).forEach(([key, value]) => {
      CreateSnapshotRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourceVolumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = CreateSnapshotRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = CreateSnapshotRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateSnapshotRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateSnapshotRequest | CreateSnapshotRequest[]>
      | Iterable<CreateSnapshotRequest | CreateSnapshotRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest.encode(p).finish()];
        }
      } else {
        yield* [CreateSnapshotRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateSnapshotRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateSnapshotRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest.decode(p)];
        }
      } else {
        yield* [CreateSnapshotRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateSnapshotRequest {
    return {
      sourceVolumeId: isSet(object.sourceVolumeId) ? String(object.sourceVolumeId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CreateSnapshotRequest): unknown {
    const obj: any = {};
    message.sourceVolumeId !== undefined && (obj.sourceVolumeId = message.sourceVolumeId);
    message.name !== undefined && (obj.name = message.name);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSnapshotRequest>, I>>(base?: I): CreateSnapshotRequest {
    return CreateSnapshotRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSnapshotRequest>, I>>(object: I): CreateSnapshotRequest {
    const message = createBaseCreateSnapshotRequest();
    message.sourceVolumeId = object.sourceVolumeId ?? "";
    message.name = object.name ?? "";
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseCreateSnapshotRequest_SecretsEntry(): CreateSnapshotRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const CreateSnapshotRequest_SecretsEntry = {
  encode(message: CreateSnapshotRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSnapshotRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSnapshotRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateSnapshotRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateSnapshotRequest_SecretsEntry | CreateSnapshotRequest_SecretsEntry[]>
      | Iterable<CreateSnapshotRequest_SecretsEntry | CreateSnapshotRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateSnapshotRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateSnapshotRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateSnapshotRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [CreateSnapshotRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateSnapshotRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateSnapshotRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSnapshotRequest_SecretsEntry>, I>>(
    base?: I,
  ): CreateSnapshotRequest_SecretsEntry {
    return CreateSnapshotRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSnapshotRequest_SecretsEntry>, I>>(
    object: I,
  ): CreateSnapshotRequest_SecretsEntry {
    const message = createBaseCreateSnapshotRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateSnapshotRequest_ParametersEntry(): CreateSnapshotRequest_ParametersEntry {
  return { key: "", value: "" };
}

export const CreateSnapshotRequest_ParametersEntry = {
  encode(message: CreateSnapshotRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSnapshotRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSnapshotRequest_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateSnapshotRequest_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateSnapshotRequest_ParametersEntry | CreateSnapshotRequest_ParametersEntry[]>
      | Iterable<CreateSnapshotRequest_ParametersEntry | CreateSnapshotRequest_ParametersEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateSnapshotRequest_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateSnapshotRequest_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateSnapshotRequest_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotRequest_ParametersEntry.decode(p)];
        }
      } else {
        yield* [CreateSnapshotRequest_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateSnapshotRequest_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateSnapshotRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSnapshotRequest_ParametersEntry>, I>>(
    base?: I,
  ): CreateSnapshotRequest_ParametersEntry {
    return CreateSnapshotRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSnapshotRequest_ParametersEntry>, I>>(
    object: I,
  ): CreateSnapshotRequest_ParametersEntry {
    const message = createBaseCreateSnapshotRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateSnapshotResponse(): CreateSnapshotResponse {
  return { snapshot: undefined };
}

export const CreateSnapshotResponse = {
  encode(message: CreateSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshot = Snapshot.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateSnapshotResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateSnapshotResponse | CreateSnapshotResponse[]>
      | Iterable<CreateSnapshotResponse | CreateSnapshotResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotResponse.encode(p).finish()];
        }
      } else {
        yield* [CreateSnapshotResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateSnapshotResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateSnapshotResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateSnapshotResponse.decode(p)];
        }
      } else {
        yield* [CreateSnapshotResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateSnapshotResponse {
    return { snapshot: isSet(object.snapshot) ? Snapshot.fromJSON(object.snapshot) : undefined };
  },

  toJSON(message: CreateSnapshotResponse): unknown {
    const obj: any = {};
    message.snapshot !== undefined && (obj.snapshot = message.snapshot ? Snapshot.toJSON(message.snapshot) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSnapshotResponse>, I>>(base?: I): CreateSnapshotResponse {
    return CreateSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSnapshotResponse>, I>>(object: I): CreateSnapshotResponse {
    const message = createBaseCreateSnapshotResponse();
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? Snapshot.fromPartial(object.snapshot)
      : undefined;
    return message;
  },
};

function createBaseSnapshot(): Snapshot {
  return {
    sizeBytes: Long.ZERO,
    snapshotId: "",
    sourceVolumeId: "",
    creationTime: undefined,
    readyToUse: false,
    groupSnapshotId: "",
  };
}

export const Snapshot = {
  encode(message: Snapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sizeBytes.isZero()) {
      writer.uint32(8).int64(message.sizeBytes);
    }
    if (message.snapshotId !== "") {
      writer.uint32(18).string(message.snapshotId);
    }
    if (message.sourceVolumeId !== "") {
      writer.uint32(26).string(message.sourceVolumeId);
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.readyToUse === true) {
      writer.uint32(40).bool(message.readyToUse);
    }
    if (message.groupSnapshotId !== "") {
      writer.uint32(50).string(message.groupSnapshotId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sizeBytes = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.snapshotId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sourceVolumeId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.readyToUse = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.groupSnapshotId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Snapshot, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<Snapshot | Snapshot[]> | Iterable<Snapshot | Snapshot[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Snapshot.encode(p).finish()];
        }
      } else {
        yield* [Snapshot.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Snapshot>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Snapshot> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Snapshot.decode(p)];
        }
      } else {
        yield* [Snapshot.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Snapshot {
    return {
      sizeBytes: isSet(object.sizeBytes) ? Long.fromValue(object.sizeBytes) : Long.ZERO,
      snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "",
      sourceVolumeId: isSet(object.sourceVolumeId) ? String(object.sourceVolumeId) : "",
      creationTime: isSet(object.creationTime) ? fromJsonTimestamp(object.creationTime) : undefined,
      readyToUse: isSet(object.readyToUse) ? Boolean(object.readyToUse) : false,
      groupSnapshotId: isSet(object.groupSnapshotId) ? String(object.groupSnapshotId) : "",
    };
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    message.sizeBytes !== undefined && (obj.sizeBytes = (message.sizeBytes || Long.ZERO).toString());
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    message.sourceVolumeId !== undefined && (obj.sourceVolumeId = message.sourceVolumeId);
    message.creationTime !== undefined && (obj.creationTime = message.creationTime.toISOString());
    message.readyToUse !== undefined && (obj.readyToUse = message.readyToUse);
    message.groupSnapshotId !== undefined && (obj.groupSnapshotId = message.groupSnapshotId);
    return obj;
  },

  create<I extends Exact<DeepPartial<Snapshot>, I>>(base?: I): Snapshot {
    return Snapshot.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = createBaseSnapshot();
    message.sizeBytes = (object.sizeBytes !== undefined && object.sizeBytes !== null)
      ? Long.fromValue(object.sizeBytes)
      : Long.ZERO;
    message.snapshotId = object.snapshotId ?? "";
    message.sourceVolumeId = object.sourceVolumeId ?? "";
    message.creationTime = object.creationTime ?? undefined;
    message.readyToUse = object.readyToUse ?? false;
    message.groupSnapshotId = object.groupSnapshotId ?? "";
    return message;
  },
};

function createBaseDeleteSnapshotRequest(): DeleteSnapshotRequest {
  return { snapshotId: "", secrets: {} };
}

export const DeleteSnapshotRequest = {
  encode(message: DeleteSnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshotId !== "") {
      writer.uint32(10).string(message.snapshotId);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      DeleteSnapshotRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshotId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = DeleteSnapshotRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.secrets[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteSnapshotRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteSnapshotRequest | DeleteSnapshotRequest[]>
      | Iterable<DeleteSnapshotRequest | DeleteSnapshotRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotRequest.encode(p).finish()];
        }
      } else {
        yield* [DeleteSnapshotRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteSnapshotRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteSnapshotRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotRequest.decode(p)];
        }
      } else {
        yield* [DeleteSnapshotRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteSnapshotRequest {
    return {
      snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "",
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DeleteSnapshotRequest): unknown {
    const obj: any = {};
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSnapshotRequest>, I>>(base?: I): DeleteSnapshotRequest {
    return DeleteSnapshotRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSnapshotRequest>, I>>(object: I): DeleteSnapshotRequest {
    const message = createBaseDeleteSnapshotRequest();
    message.snapshotId = object.snapshotId ?? "";
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseDeleteSnapshotRequest_SecretsEntry(): DeleteSnapshotRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const DeleteSnapshotRequest_SecretsEntry = {
  encode(message: DeleteSnapshotRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSnapshotRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSnapshotRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteSnapshotRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteSnapshotRequest_SecretsEntry | DeleteSnapshotRequest_SecretsEntry[]>
      | Iterable<DeleteSnapshotRequest_SecretsEntry | DeleteSnapshotRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [DeleteSnapshotRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteSnapshotRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteSnapshotRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [DeleteSnapshotRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteSnapshotRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: DeleteSnapshotRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSnapshotRequest_SecretsEntry>, I>>(
    base?: I,
  ): DeleteSnapshotRequest_SecretsEntry {
    return DeleteSnapshotRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSnapshotRequest_SecretsEntry>, I>>(
    object: I,
  ): DeleteSnapshotRequest_SecretsEntry {
    const message = createBaseDeleteSnapshotRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteSnapshotResponse(): DeleteSnapshotResponse {
  return {};
}

export const DeleteSnapshotResponse = {
  encode(_: DeleteSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteSnapshotResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteSnapshotResponse | DeleteSnapshotResponse[]>
      | Iterable<DeleteSnapshotResponse | DeleteSnapshotResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotResponse.encode(p).finish()];
        }
      } else {
        yield* [DeleteSnapshotResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteSnapshotResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteSnapshotResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteSnapshotResponse.decode(p)];
        }
      } else {
        yield* [DeleteSnapshotResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): DeleteSnapshotResponse {
    return {};
  },

  toJSON(_: DeleteSnapshotResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSnapshotResponse>, I>>(base?: I): DeleteSnapshotResponse {
    return DeleteSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSnapshotResponse>, I>>(_: I): DeleteSnapshotResponse {
    const message = createBaseDeleteSnapshotResponse();
    return message;
  },
};

function createBaseListSnapshotsRequest(): ListSnapshotsRequest {
  return { maxEntries: 0, startingToken: "", sourceVolumeId: "", snapshotId: "", secrets: {} };
}

export const ListSnapshotsRequest = {
  encode(message: ListSnapshotsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxEntries !== 0) {
      writer.uint32(8).int32(message.maxEntries);
    }
    if (message.startingToken !== "") {
      writer.uint32(18).string(message.startingToken);
    }
    if (message.sourceVolumeId !== "") {
      writer.uint32(26).string(message.sourceVolumeId);
    }
    if (message.snapshotId !== "") {
      writer.uint32(34).string(message.snapshotId);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      ListSnapshotsRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSnapshotsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSnapshotsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxEntries = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startingToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sourceVolumeId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.snapshotId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = ListSnapshotsRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.secrets[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListSnapshotsRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListSnapshotsRequest | ListSnapshotsRequest[]>
      | Iterable<ListSnapshotsRequest | ListSnapshotsRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsRequest.encode(p).finish()];
        }
      } else {
        yield* [ListSnapshotsRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListSnapshotsRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListSnapshotsRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsRequest.decode(p)];
        }
      } else {
        yield* [ListSnapshotsRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListSnapshotsRequest {
    return {
      maxEntries: isSet(object.maxEntries) ? Number(object.maxEntries) : 0,
      startingToken: isSet(object.startingToken) ? String(object.startingToken) : "",
      sourceVolumeId: isSet(object.sourceVolumeId) ? String(object.sourceVolumeId) : "",
      snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "",
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ListSnapshotsRequest): unknown {
    const obj: any = {};
    message.maxEntries !== undefined && (obj.maxEntries = Math.round(message.maxEntries));
    message.startingToken !== undefined && (obj.startingToken = message.startingToken);
    message.sourceVolumeId !== undefined && (obj.sourceVolumeId = message.sourceVolumeId);
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSnapshotsRequest>, I>>(base?: I): ListSnapshotsRequest {
    return ListSnapshotsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListSnapshotsRequest>, I>>(object: I): ListSnapshotsRequest {
    const message = createBaseListSnapshotsRequest();
    message.maxEntries = object.maxEntries ?? 0;
    message.startingToken = object.startingToken ?? "";
    message.sourceVolumeId = object.sourceVolumeId ?? "";
    message.snapshotId = object.snapshotId ?? "";
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseListSnapshotsRequest_SecretsEntry(): ListSnapshotsRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const ListSnapshotsRequest_SecretsEntry = {
  encode(message: ListSnapshotsRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSnapshotsRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSnapshotsRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListSnapshotsRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListSnapshotsRequest_SecretsEntry | ListSnapshotsRequest_SecretsEntry[]>
      | Iterable<ListSnapshotsRequest_SecretsEntry | ListSnapshotsRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [ListSnapshotsRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListSnapshotsRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListSnapshotsRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [ListSnapshotsRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListSnapshotsRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ListSnapshotsRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSnapshotsRequest_SecretsEntry>, I>>(
    base?: I,
  ): ListSnapshotsRequest_SecretsEntry {
    return ListSnapshotsRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListSnapshotsRequest_SecretsEntry>, I>>(
    object: I,
  ): ListSnapshotsRequest_SecretsEntry {
    const message = createBaseListSnapshotsRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseListSnapshotsResponse(): ListSnapshotsResponse {
  return { entries: [], nextToken: "" };
}

export const ListSnapshotsResponse = {
  encode(message: ListSnapshotsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      ListSnapshotsResponse_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextToken !== "") {
      writer.uint32(18).string(message.nextToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSnapshotsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSnapshotsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entries.push(ListSnapshotsResponse_Entry.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListSnapshotsResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListSnapshotsResponse | ListSnapshotsResponse[]>
      | Iterable<ListSnapshotsResponse | ListSnapshotsResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsResponse.encode(p).finish()];
        }
      } else {
        yield* [ListSnapshotsResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListSnapshotsResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListSnapshotsResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsResponse.decode(p)];
        }
      } else {
        yield* [ListSnapshotsResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListSnapshotsResponse {
    return {
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => ListSnapshotsResponse_Entry.fromJSON(e))
        : [],
      nextToken: isSet(object.nextToken) ? String(object.nextToken) : "",
    };
  },

  toJSON(message: ListSnapshotsResponse): unknown {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map((e) => e ? ListSnapshotsResponse_Entry.toJSON(e) : undefined);
    } else {
      obj.entries = [];
    }
    message.nextToken !== undefined && (obj.nextToken = message.nextToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSnapshotsResponse>, I>>(base?: I): ListSnapshotsResponse {
    return ListSnapshotsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListSnapshotsResponse>, I>>(object: I): ListSnapshotsResponse {
    const message = createBaseListSnapshotsResponse();
    message.entries = object.entries?.map((e) => ListSnapshotsResponse_Entry.fromPartial(e)) || [];
    message.nextToken = object.nextToken ?? "";
    return message;
  },
};

function createBaseListSnapshotsResponse_Entry(): ListSnapshotsResponse_Entry {
  return { snapshot: undefined };
}

export const ListSnapshotsResponse_Entry = {
  encode(message: ListSnapshotsResponse_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSnapshotsResponse_Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSnapshotsResponse_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshot = Snapshot.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ListSnapshotsResponse_Entry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ListSnapshotsResponse_Entry | ListSnapshotsResponse_Entry[]>
      | Iterable<ListSnapshotsResponse_Entry | ListSnapshotsResponse_Entry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsResponse_Entry.encode(p).finish()];
        }
      } else {
        yield* [ListSnapshotsResponse_Entry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ListSnapshotsResponse_Entry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ListSnapshotsResponse_Entry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ListSnapshotsResponse_Entry.decode(p)];
        }
      } else {
        yield* [ListSnapshotsResponse_Entry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ListSnapshotsResponse_Entry {
    return { snapshot: isSet(object.snapshot) ? Snapshot.fromJSON(object.snapshot) : undefined };
  },

  toJSON(message: ListSnapshotsResponse_Entry): unknown {
    const obj: any = {};
    message.snapshot !== undefined && (obj.snapshot = message.snapshot ? Snapshot.toJSON(message.snapshot) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSnapshotsResponse_Entry>, I>>(base?: I): ListSnapshotsResponse_Entry {
    return ListSnapshotsResponse_Entry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListSnapshotsResponse_Entry>, I>>(object: I): ListSnapshotsResponse_Entry {
    const message = createBaseListSnapshotsResponse_Entry();
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? Snapshot.fromPartial(object.snapshot)
      : undefined;
    return message;
  },
};

function createBaseControllerExpandVolumeRequest(): ControllerExpandVolumeRequest {
  return { volumeId: "", capacityRange: undefined, secrets: {}, volumeCapability: undefined };
}

export const ControllerExpandVolumeRequest = {
  encode(message: ControllerExpandVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.capacityRange !== undefined) {
      CapacityRange.encode(message.capacityRange, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      ControllerExpandVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    if (message.volumeCapability !== undefined) {
      VolumeCapability.encode(message.volumeCapability, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerExpandVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerExpandVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.capacityRange = CapacityRange.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ControllerExpandVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.volumeCapability = VolumeCapability.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerExpandVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerExpandVolumeRequest | ControllerExpandVolumeRequest[]>
      | Iterable<ControllerExpandVolumeRequest | ControllerExpandVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [ControllerExpandVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerExpandVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerExpandVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeRequest.decode(p)];
        }
      } else {
        yield* [ControllerExpandVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerExpandVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      capacityRange: isSet(object.capacityRange) ? CapacityRange.fromJSON(object.capacityRange) : undefined,
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeCapability: isSet(object.volumeCapability) ? VolumeCapability.fromJSON(object.volumeCapability) : undefined,
    };
  },

  toJSON(message: ControllerExpandVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.capacityRange !== undefined &&
      (obj.capacityRange = message.capacityRange ? CapacityRange.toJSON(message.capacityRange) : undefined);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    message.volumeCapability !== undefined &&
      (obj.volumeCapability = message.volumeCapability ? VolumeCapability.toJSON(message.volumeCapability) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerExpandVolumeRequest>, I>>(base?: I): ControllerExpandVolumeRequest {
    return ControllerExpandVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerExpandVolumeRequest>, I>>(
    object: I,
  ): ControllerExpandVolumeRequest {
    const message = createBaseControllerExpandVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.capacityRange = (object.capacityRange !== undefined && object.capacityRange !== null)
      ? CapacityRange.fromPartial(object.capacityRange)
      : undefined;
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.volumeCapability = (object.volumeCapability !== undefined && object.volumeCapability !== null)
      ? VolumeCapability.fromPartial(object.volumeCapability)
      : undefined;
    return message;
  },
};

function createBaseControllerExpandVolumeRequest_SecretsEntry(): ControllerExpandVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const ControllerExpandVolumeRequest_SecretsEntry = {
  encode(message: ControllerExpandVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerExpandVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerExpandVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerExpandVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerExpandVolumeRequest_SecretsEntry | ControllerExpandVolumeRequest_SecretsEntry[]>
      | Iterable<ControllerExpandVolumeRequest_SecretsEntry | ControllerExpandVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [ControllerExpandVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerExpandVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerExpandVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [ControllerExpandVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerExpandVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ControllerExpandVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerExpandVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): ControllerExpandVolumeRequest_SecretsEntry {
    return ControllerExpandVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerExpandVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): ControllerExpandVolumeRequest_SecretsEntry {
    const message = createBaseControllerExpandVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseControllerExpandVolumeResponse(): ControllerExpandVolumeResponse {
  return { capacityBytes: Long.ZERO, nodeExpansionRequired: false };
}

export const ControllerExpandVolumeResponse = {
  encode(message: ControllerExpandVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.capacityBytes.isZero()) {
      writer.uint32(8).int64(message.capacityBytes);
    }
    if (message.nodeExpansionRequired === true) {
      writer.uint32(16).bool(message.nodeExpansionRequired);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerExpandVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerExpandVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.capacityBytes = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nodeExpansionRequired = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<ControllerExpandVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<ControllerExpandVolumeResponse | ControllerExpandVolumeResponse[]>
      | Iterable<ControllerExpandVolumeResponse | ControllerExpandVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [ControllerExpandVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, ControllerExpandVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<ControllerExpandVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [ControllerExpandVolumeResponse.decode(p)];
        }
      } else {
        yield* [ControllerExpandVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): ControllerExpandVolumeResponse {
    return {
      capacityBytes: isSet(object.capacityBytes) ? Long.fromValue(object.capacityBytes) : Long.ZERO,
      nodeExpansionRequired: isSet(object.nodeExpansionRequired) ? Boolean(object.nodeExpansionRequired) : false,
    };
  },

  toJSON(message: ControllerExpandVolumeResponse): unknown {
    const obj: any = {};
    message.capacityBytes !== undefined && (obj.capacityBytes = (message.capacityBytes || Long.ZERO).toString());
    message.nodeExpansionRequired !== undefined && (obj.nodeExpansionRequired = message.nodeExpansionRequired);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerExpandVolumeResponse>, I>>(base?: I): ControllerExpandVolumeResponse {
    return ControllerExpandVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControllerExpandVolumeResponse>, I>>(
    object: I,
  ): ControllerExpandVolumeResponse {
    const message = createBaseControllerExpandVolumeResponse();
    message.capacityBytes = (object.capacityBytes !== undefined && object.capacityBytes !== null)
      ? Long.fromValue(object.capacityBytes)
      : Long.ZERO;
    message.nodeExpansionRequired = object.nodeExpansionRequired ?? false;
    return message;
  },
};

function createBaseNodeStageVolumeRequest(): NodeStageVolumeRequest {
  return {
    volumeId: "",
    publishContext: {},
    stagingTargetPath: "",
    volumeCapability: undefined,
    secrets: {},
    volumeContext: {},
  };
}

export const NodeStageVolumeRequest = {
  encode(message: NodeStageVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    Object.entries(message.publishContext).forEach(([key, value]) => {
      NodeStageVolumeRequest_PublishContextEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    if (message.stagingTargetPath !== "") {
      writer.uint32(26).string(message.stagingTargetPath);
    }
    if (message.volumeCapability !== undefined) {
      VolumeCapability.encode(message.volumeCapability, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      NodeStageVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      NodeStageVolumeRequest_VolumeContextEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStageVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStageVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = NodeStageVolumeRequest_PublishContextEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.publishContext[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stagingTargetPath = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.volumeCapability = VolumeCapability.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = NodeStageVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.secrets[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = NodeStageVolumeRequest_VolumeContextEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.volumeContext[entry6.key] = entry6.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeStageVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeStageVolumeRequest | NodeStageVolumeRequest[]>
      | Iterable<NodeStageVolumeRequest | NodeStageVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeStageVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeStageVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeStageVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest.decode(p)];
        }
      } else {
        yield* [NodeStageVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeStageVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      publishContext: isObject(object.publishContext)
        ? Object.entries(object.publishContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      stagingTargetPath: isSet(object.stagingTargetPath) ? String(object.stagingTargetPath) : "",
      volumeCapability: isSet(object.volumeCapability) ? VolumeCapability.fromJSON(object.volumeCapability) : undefined,
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: NodeStageVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    obj.publishContext = {};
    if (message.publishContext) {
      Object.entries(message.publishContext).forEach(([k, v]) => {
        obj.publishContext[k] = v;
      });
    }
    message.stagingTargetPath !== undefined && (obj.stagingTargetPath = message.stagingTargetPath);
    message.volumeCapability !== undefined &&
      (obj.volumeCapability = message.volumeCapability ? VolumeCapability.toJSON(message.volumeCapability) : undefined);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeStageVolumeRequest>, I>>(base?: I): NodeStageVolumeRequest {
    return NodeStageVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeStageVolumeRequest>, I>>(object: I): NodeStageVolumeRequest {
    const message = createBaseNodeStageVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.publishContext = Object.entries(object.publishContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.stagingTargetPath = object.stagingTargetPath ?? "";
    message.volumeCapability = (object.volumeCapability !== undefined && object.volumeCapability !== null)
      ? VolumeCapability.fromPartial(object.volumeCapability)
      : undefined;
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseNodeStageVolumeRequest_PublishContextEntry(): NodeStageVolumeRequest_PublishContextEntry {
  return { key: "", value: "" };
}

export const NodeStageVolumeRequest_PublishContextEntry = {
  encode(message: NodeStageVolumeRequest_PublishContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStageVolumeRequest_PublishContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStageVolumeRequest_PublishContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeStageVolumeRequest_PublishContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeStageVolumeRequest_PublishContextEntry | NodeStageVolumeRequest_PublishContextEntry[]>
      | Iterable<NodeStageVolumeRequest_PublishContextEntry | NodeStageVolumeRequest_PublishContextEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_PublishContextEntry.encode(p).finish()];
        }
      } else {
        yield* [NodeStageVolumeRequest_PublishContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeStageVolumeRequest_PublishContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeStageVolumeRequest_PublishContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_PublishContextEntry.decode(p)];
        }
      } else {
        yield* [NodeStageVolumeRequest_PublishContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeStageVolumeRequest_PublishContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodeStageVolumeRequest_PublishContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeStageVolumeRequest_PublishContextEntry>, I>>(
    base?: I,
  ): NodeStageVolumeRequest_PublishContextEntry {
    return NodeStageVolumeRequest_PublishContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeStageVolumeRequest_PublishContextEntry>, I>>(
    object: I,
  ): NodeStageVolumeRequest_PublishContextEntry {
    const message = createBaseNodeStageVolumeRequest_PublishContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodeStageVolumeRequest_SecretsEntry(): NodeStageVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const NodeStageVolumeRequest_SecretsEntry = {
  encode(message: NodeStageVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStageVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStageVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeStageVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeStageVolumeRequest_SecretsEntry | NodeStageVolumeRequest_SecretsEntry[]>
      | Iterable<NodeStageVolumeRequest_SecretsEntry | NodeStageVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [NodeStageVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeStageVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeStageVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [NodeStageVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeStageVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodeStageVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeStageVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): NodeStageVolumeRequest_SecretsEntry {
    return NodeStageVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeStageVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): NodeStageVolumeRequest_SecretsEntry {
    const message = createBaseNodeStageVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodeStageVolumeRequest_VolumeContextEntry(): NodeStageVolumeRequest_VolumeContextEntry {
  return { key: "", value: "" };
}

export const NodeStageVolumeRequest_VolumeContextEntry = {
  encode(message: NodeStageVolumeRequest_VolumeContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStageVolumeRequest_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStageVolumeRequest_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeStageVolumeRequest_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeStageVolumeRequest_VolumeContextEntry | NodeStageVolumeRequest_VolumeContextEntry[]>
      | Iterable<NodeStageVolumeRequest_VolumeContextEntry | NodeStageVolumeRequest_VolumeContextEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [NodeStageVolumeRequest_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeStageVolumeRequest_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeStageVolumeRequest_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeRequest_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [NodeStageVolumeRequest_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeStageVolumeRequest_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodeStageVolumeRequest_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeStageVolumeRequest_VolumeContextEntry>, I>>(
    base?: I,
  ): NodeStageVolumeRequest_VolumeContextEntry {
    return NodeStageVolumeRequest_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeStageVolumeRequest_VolumeContextEntry>, I>>(
    object: I,
  ): NodeStageVolumeRequest_VolumeContextEntry {
    const message = createBaseNodeStageVolumeRequest_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodeStageVolumeResponse(): NodeStageVolumeResponse {
  return {};
}

export const NodeStageVolumeResponse = {
  encode(_: NodeStageVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStageVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStageVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeStageVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeStageVolumeResponse | NodeStageVolumeResponse[]>
      | Iterable<NodeStageVolumeResponse | NodeStageVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeStageVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeStageVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeStageVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeStageVolumeResponse.decode(p)];
        }
      } else {
        yield* [NodeStageVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodeStageVolumeResponse {
    return {};
  },

  toJSON(_: NodeStageVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeStageVolumeResponse>, I>>(base?: I): NodeStageVolumeResponse {
    return NodeStageVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeStageVolumeResponse>, I>>(_: I): NodeStageVolumeResponse {
    const message = createBaseNodeStageVolumeResponse();
    return message;
  },
};

function createBaseNodeUnstageVolumeRequest(): NodeUnstageVolumeRequest {
  return { volumeId: "", stagingTargetPath: "" };
}

export const NodeUnstageVolumeRequest = {
  encode(message: NodeUnstageVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.stagingTargetPath !== "") {
      writer.uint32(18).string(message.stagingTargetPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUnstageVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUnstageVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stagingTargetPath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeUnstageVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeUnstageVolumeRequest | NodeUnstageVolumeRequest[]>
      | Iterable<NodeUnstageVolumeRequest | NodeUnstageVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnstageVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeUnstageVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeUnstageVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeUnstageVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnstageVolumeRequest.decode(p)];
        }
      } else {
        yield* [NodeUnstageVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeUnstageVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      stagingTargetPath: isSet(object.stagingTargetPath) ? String(object.stagingTargetPath) : "",
    };
  },

  toJSON(message: NodeUnstageVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.stagingTargetPath !== undefined && (obj.stagingTargetPath = message.stagingTargetPath);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeUnstageVolumeRequest>, I>>(base?: I): NodeUnstageVolumeRequest {
    return NodeUnstageVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeUnstageVolumeRequest>, I>>(object: I): NodeUnstageVolumeRequest {
    const message = createBaseNodeUnstageVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.stagingTargetPath = object.stagingTargetPath ?? "";
    return message;
  },
};

function createBaseNodeUnstageVolumeResponse(): NodeUnstageVolumeResponse {
  return {};
}

export const NodeUnstageVolumeResponse = {
  encode(_: NodeUnstageVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUnstageVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUnstageVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeUnstageVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeUnstageVolumeResponse | NodeUnstageVolumeResponse[]>
      | Iterable<NodeUnstageVolumeResponse | NodeUnstageVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnstageVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeUnstageVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeUnstageVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeUnstageVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnstageVolumeResponse.decode(p)];
        }
      } else {
        yield* [NodeUnstageVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodeUnstageVolumeResponse {
    return {};
  },

  toJSON(_: NodeUnstageVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeUnstageVolumeResponse>, I>>(base?: I): NodeUnstageVolumeResponse {
    return NodeUnstageVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeUnstageVolumeResponse>, I>>(_: I): NodeUnstageVolumeResponse {
    const message = createBaseNodeUnstageVolumeResponse();
    return message;
  },
};

function createBaseNodePublishVolumeRequest(): NodePublishVolumeRequest {
  return {
    volumeId: "",
    publishContext: {},
    stagingTargetPath: "",
    targetPath: "",
    volumeCapability: undefined,
    readonly: false,
    secrets: {},
    volumeContext: {},
  };
}

export const NodePublishVolumeRequest = {
  encode(message: NodePublishVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    Object.entries(message.publishContext).forEach(([key, value]) => {
      NodePublishVolumeRequest_PublishContextEntry.encode({ key: key as any, value }, writer.uint32(18).fork())
        .ldelim();
    });
    if (message.stagingTargetPath !== "") {
      writer.uint32(26).string(message.stagingTargetPath);
    }
    if (message.targetPath !== "") {
      writer.uint32(34).string(message.targetPath);
    }
    if (message.volumeCapability !== undefined) {
      VolumeCapability.encode(message.volumeCapability, writer.uint32(42).fork()).ldelim();
    }
    if (message.readonly === true) {
      writer.uint32(48).bool(message.readonly);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      NodePublishVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(58).fork()).ldelim();
    });
    Object.entries(message.volumeContext).forEach(([key, value]) => {
      NodePublishVolumeRequest_VolumeContextEntry.encode({ key: key as any, value }, writer.uint32(66).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePublishVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePublishVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = NodePublishVolumeRequest_PublishContextEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.publishContext[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stagingTargetPath = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetPath = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.volumeCapability = VolumeCapability.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.readonly = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          const entry7 = NodePublishVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.secrets[entry7.key] = entry7.value;
          }
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = NodePublishVolumeRequest_VolumeContextEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.volumeContext[entry8.key] = entry8.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodePublishVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodePublishVolumeRequest | NodePublishVolumeRequest[]>
      | Iterable<NodePublishVolumeRequest | NodePublishVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [NodePublishVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodePublishVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodePublishVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest.decode(p)];
        }
      } else {
        yield* [NodePublishVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodePublishVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      publishContext: isObject(object.publishContext)
        ? Object.entries(object.publishContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      stagingTargetPath: isSet(object.stagingTargetPath) ? String(object.stagingTargetPath) : "",
      targetPath: isSet(object.targetPath) ? String(object.targetPath) : "",
      volumeCapability: isSet(object.volumeCapability) ? VolumeCapability.fromJSON(object.volumeCapability) : undefined,
      readonly: isSet(object.readonly) ? Boolean(object.readonly) : false,
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeContext: isObject(object.volumeContext)
        ? Object.entries(object.volumeContext).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: NodePublishVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    obj.publishContext = {};
    if (message.publishContext) {
      Object.entries(message.publishContext).forEach(([k, v]) => {
        obj.publishContext[k] = v;
      });
    }
    message.stagingTargetPath !== undefined && (obj.stagingTargetPath = message.stagingTargetPath);
    message.targetPath !== undefined && (obj.targetPath = message.targetPath);
    message.volumeCapability !== undefined &&
      (obj.volumeCapability = message.volumeCapability ? VolumeCapability.toJSON(message.volumeCapability) : undefined);
    message.readonly !== undefined && (obj.readonly = message.readonly);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    obj.volumeContext = {};
    if (message.volumeContext) {
      Object.entries(message.volumeContext).forEach(([k, v]) => {
        obj.volumeContext[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodePublishVolumeRequest>, I>>(base?: I): NodePublishVolumeRequest {
    return NodePublishVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodePublishVolumeRequest>, I>>(object: I): NodePublishVolumeRequest {
    const message = createBaseNodePublishVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.publishContext = Object.entries(object.publishContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.stagingTargetPath = object.stagingTargetPath ?? "";
    message.targetPath = object.targetPath ?? "";
    message.volumeCapability = (object.volumeCapability !== undefined && object.volumeCapability !== null)
      ? VolumeCapability.fromPartial(object.volumeCapability)
      : undefined;
    message.readonly = object.readonly ?? false;
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.volumeContext = Object.entries(object.volumeContext ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseNodePublishVolumeRequest_PublishContextEntry(): NodePublishVolumeRequest_PublishContextEntry {
  return { key: "", value: "" };
}

export const NodePublishVolumeRequest_PublishContextEntry = {
  encode(message: NodePublishVolumeRequest_PublishContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePublishVolumeRequest_PublishContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePublishVolumeRequest_PublishContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodePublishVolumeRequest_PublishContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodePublishVolumeRequest_PublishContextEntry | NodePublishVolumeRequest_PublishContextEntry[]>
      | Iterable<NodePublishVolumeRequest_PublishContextEntry | NodePublishVolumeRequest_PublishContextEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_PublishContextEntry.encode(p).finish()];
        }
      } else {
        yield* [NodePublishVolumeRequest_PublishContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodePublishVolumeRequest_PublishContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodePublishVolumeRequest_PublishContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_PublishContextEntry.decode(p)];
        }
      } else {
        yield* [NodePublishVolumeRequest_PublishContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodePublishVolumeRequest_PublishContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodePublishVolumeRequest_PublishContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodePublishVolumeRequest_PublishContextEntry>, I>>(
    base?: I,
  ): NodePublishVolumeRequest_PublishContextEntry {
    return NodePublishVolumeRequest_PublishContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodePublishVolumeRequest_PublishContextEntry>, I>>(
    object: I,
  ): NodePublishVolumeRequest_PublishContextEntry {
    const message = createBaseNodePublishVolumeRequest_PublishContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodePublishVolumeRequest_SecretsEntry(): NodePublishVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const NodePublishVolumeRequest_SecretsEntry = {
  encode(message: NodePublishVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePublishVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePublishVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodePublishVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodePublishVolumeRequest_SecretsEntry | NodePublishVolumeRequest_SecretsEntry[]>
      | Iterable<NodePublishVolumeRequest_SecretsEntry | NodePublishVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [NodePublishVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodePublishVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodePublishVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [NodePublishVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodePublishVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodePublishVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodePublishVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): NodePublishVolumeRequest_SecretsEntry {
    return NodePublishVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodePublishVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): NodePublishVolumeRequest_SecretsEntry {
    const message = createBaseNodePublishVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodePublishVolumeRequest_VolumeContextEntry(): NodePublishVolumeRequest_VolumeContextEntry {
  return { key: "", value: "" };
}

export const NodePublishVolumeRequest_VolumeContextEntry = {
  encode(message: NodePublishVolumeRequest_VolumeContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePublishVolumeRequest_VolumeContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePublishVolumeRequest_VolumeContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodePublishVolumeRequest_VolumeContextEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodePublishVolumeRequest_VolumeContextEntry | NodePublishVolumeRequest_VolumeContextEntry[]>
      | Iterable<NodePublishVolumeRequest_VolumeContextEntry | NodePublishVolumeRequest_VolumeContextEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_VolumeContextEntry.encode(p).finish()];
        }
      } else {
        yield* [NodePublishVolumeRequest_VolumeContextEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodePublishVolumeRequest_VolumeContextEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodePublishVolumeRequest_VolumeContextEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeRequest_VolumeContextEntry.decode(p)];
        }
      } else {
        yield* [NodePublishVolumeRequest_VolumeContextEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodePublishVolumeRequest_VolumeContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodePublishVolumeRequest_VolumeContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodePublishVolumeRequest_VolumeContextEntry>, I>>(
    base?: I,
  ): NodePublishVolumeRequest_VolumeContextEntry {
    return NodePublishVolumeRequest_VolumeContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodePublishVolumeRequest_VolumeContextEntry>, I>>(
    object: I,
  ): NodePublishVolumeRequest_VolumeContextEntry {
    const message = createBaseNodePublishVolumeRequest_VolumeContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodePublishVolumeResponse(): NodePublishVolumeResponse {
  return {};
}

export const NodePublishVolumeResponse = {
  encode(_: NodePublishVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePublishVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePublishVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodePublishVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodePublishVolumeResponse | NodePublishVolumeResponse[]>
      | Iterable<NodePublishVolumeResponse | NodePublishVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [NodePublishVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodePublishVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodePublishVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodePublishVolumeResponse.decode(p)];
        }
      } else {
        yield* [NodePublishVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodePublishVolumeResponse {
    return {};
  },

  toJSON(_: NodePublishVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodePublishVolumeResponse>, I>>(base?: I): NodePublishVolumeResponse {
    return NodePublishVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodePublishVolumeResponse>, I>>(_: I): NodePublishVolumeResponse {
    const message = createBaseNodePublishVolumeResponse();
    return message;
  },
};

function createBaseNodeUnpublishVolumeRequest(): NodeUnpublishVolumeRequest {
  return { volumeId: "", targetPath: "" };
}

export const NodeUnpublishVolumeRequest = {
  encode(message: NodeUnpublishVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.targetPath !== "") {
      writer.uint32(18).string(message.targetPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUnpublishVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUnpublishVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.targetPath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeUnpublishVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeUnpublishVolumeRequest | NodeUnpublishVolumeRequest[]>
      | Iterable<NodeUnpublishVolumeRequest | NodeUnpublishVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnpublishVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeUnpublishVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeUnpublishVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeUnpublishVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnpublishVolumeRequest.decode(p)];
        }
      } else {
        yield* [NodeUnpublishVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeUnpublishVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      targetPath: isSet(object.targetPath) ? String(object.targetPath) : "",
    };
  },

  toJSON(message: NodeUnpublishVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.targetPath !== undefined && (obj.targetPath = message.targetPath);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeUnpublishVolumeRequest>, I>>(base?: I): NodeUnpublishVolumeRequest {
    return NodeUnpublishVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeUnpublishVolumeRequest>, I>>(object: I): NodeUnpublishVolumeRequest {
    const message = createBaseNodeUnpublishVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.targetPath = object.targetPath ?? "";
    return message;
  },
};

function createBaseNodeUnpublishVolumeResponse(): NodeUnpublishVolumeResponse {
  return {};
}

export const NodeUnpublishVolumeResponse = {
  encode(_: NodeUnpublishVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUnpublishVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUnpublishVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeUnpublishVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeUnpublishVolumeResponse | NodeUnpublishVolumeResponse[]>
      | Iterable<NodeUnpublishVolumeResponse | NodeUnpublishVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnpublishVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeUnpublishVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeUnpublishVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeUnpublishVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeUnpublishVolumeResponse.decode(p)];
        }
      } else {
        yield* [NodeUnpublishVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodeUnpublishVolumeResponse {
    return {};
  },

  toJSON(_: NodeUnpublishVolumeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeUnpublishVolumeResponse>, I>>(base?: I): NodeUnpublishVolumeResponse {
    return NodeUnpublishVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeUnpublishVolumeResponse>, I>>(_: I): NodeUnpublishVolumeResponse {
    const message = createBaseNodeUnpublishVolumeResponse();
    return message;
  },
};

function createBaseNodeGetVolumeStatsRequest(): NodeGetVolumeStatsRequest {
  return { volumeId: "", volumePath: "", stagingTargetPath: "" };
}

export const NodeGetVolumeStatsRequest = {
  encode(message: NodeGetVolumeStatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.volumePath !== "") {
      writer.uint32(18).string(message.volumePath);
    }
    if (message.stagingTargetPath !== "") {
      writer.uint32(26).string(message.stagingTargetPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetVolumeStatsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetVolumeStatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stagingTargetPath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetVolumeStatsRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetVolumeStatsRequest | NodeGetVolumeStatsRequest[]>
      | Iterable<NodeGetVolumeStatsRequest | NodeGetVolumeStatsRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetVolumeStatsRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeGetVolumeStatsRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetVolumeStatsRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetVolumeStatsRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetVolumeStatsRequest.decode(p)];
        }
      } else {
        yield* [NodeGetVolumeStatsRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeGetVolumeStatsRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      volumePath: isSet(object.volumePath) ? String(object.volumePath) : "",
      stagingTargetPath: isSet(object.stagingTargetPath) ? String(object.stagingTargetPath) : "",
    };
  },

  toJSON(message: NodeGetVolumeStatsRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.volumePath !== undefined && (obj.volumePath = message.volumePath);
    message.stagingTargetPath !== undefined && (obj.stagingTargetPath = message.stagingTargetPath);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetVolumeStatsRequest>, I>>(base?: I): NodeGetVolumeStatsRequest {
    return NodeGetVolumeStatsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetVolumeStatsRequest>, I>>(object: I): NodeGetVolumeStatsRequest {
    const message = createBaseNodeGetVolumeStatsRequest();
    message.volumeId = object.volumeId ?? "";
    message.volumePath = object.volumePath ?? "";
    message.stagingTargetPath = object.stagingTargetPath ?? "";
    return message;
  },
};

function createBaseNodeGetVolumeStatsResponse(): NodeGetVolumeStatsResponse {
  return { usage: [], volumeCondition: undefined };
}

export const NodeGetVolumeStatsResponse = {
  encode(message: NodeGetVolumeStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.usage) {
      VolumeUsage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.volumeCondition !== undefined) {
      VolumeCondition.encode(message.volumeCondition, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetVolumeStatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetVolumeStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.usage.push(VolumeUsage.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumeCondition = VolumeCondition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetVolumeStatsResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetVolumeStatsResponse | NodeGetVolumeStatsResponse[]>
      | Iterable<NodeGetVolumeStatsResponse | NodeGetVolumeStatsResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetVolumeStatsResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeGetVolumeStatsResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetVolumeStatsResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetVolumeStatsResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetVolumeStatsResponse.decode(p)];
        }
      } else {
        yield* [NodeGetVolumeStatsResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeGetVolumeStatsResponse {
    return {
      usage: Array.isArray(object?.usage) ? object.usage.map((e: any) => VolumeUsage.fromJSON(e)) : [],
      volumeCondition: isSet(object.volumeCondition) ? VolumeCondition.fromJSON(object.volumeCondition) : undefined,
    };
  },

  toJSON(message: NodeGetVolumeStatsResponse): unknown {
    const obj: any = {};
    if (message.usage) {
      obj.usage = message.usage.map((e) => e ? VolumeUsage.toJSON(e) : undefined);
    } else {
      obj.usage = [];
    }
    message.volumeCondition !== undefined &&
      (obj.volumeCondition = message.volumeCondition ? VolumeCondition.toJSON(message.volumeCondition) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetVolumeStatsResponse>, I>>(base?: I): NodeGetVolumeStatsResponse {
    return NodeGetVolumeStatsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetVolumeStatsResponse>, I>>(object: I): NodeGetVolumeStatsResponse {
    const message = createBaseNodeGetVolumeStatsResponse();
    message.usage = object.usage?.map((e) => VolumeUsage.fromPartial(e)) || [];
    message.volumeCondition = (object.volumeCondition !== undefined && object.volumeCondition !== null)
      ? VolumeCondition.fromPartial(object.volumeCondition)
      : undefined;
    return message;
  },
};

function createBaseVolumeUsage(): VolumeUsage {
  return { available: Long.ZERO, total: Long.ZERO, used: Long.ZERO, unit: 0 };
}

export const VolumeUsage = {
  encode(message: VolumeUsage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.available.isZero()) {
      writer.uint32(8).int64(message.available);
    }
    if (!message.total.isZero()) {
      writer.uint32(16).int64(message.total);
    }
    if (!message.used.isZero()) {
      writer.uint32(24).int64(message.used);
    }
    if (message.unit !== 0) {
      writer.uint32(32).int32(message.unit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeUsage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeUsage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.available = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.total = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.used = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.unit = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeUsage, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<VolumeUsage | VolumeUsage[]> | Iterable<VolumeUsage | VolumeUsage[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeUsage.encode(p).finish()];
        }
      } else {
        yield* [VolumeUsage.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeUsage>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeUsage> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeUsage.decode(p)];
        }
      } else {
        yield* [VolumeUsage.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeUsage {
    return {
      available: isSet(object.available) ? Long.fromValue(object.available) : Long.ZERO,
      total: isSet(object.total) ? Long.fromValue(object.total) : Long.ZERO,
      used: isSet(object.used) ? Long.fromValue(object.used) : Long.ZERO,
      unit: isSet(object.unit) ? volumeUsage_UnitFromJSON(object.unit) : 0,
    };
  },

  toJSON(message: VolumeUsage): unknown {
    const obj: any = {};
    message.available !== undefined && (obj.available = (message.available || Long.ZERO).toString());
    message.total !== undefined && (obj.total = (message.total || Long.ZERO).toString());
    message.used !== undefined && (obj.used = (message.used || Long.ZERO).toString());
    message.unit !== undefined && (obj.unit = volumeUsage_UnitToJSON(message.unit));
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeUsage>, I>>(base?: I): VolumeUsage {
    return VolumeUsage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeUsage>, I>>(object: I): VolumeUsage {
    const message = createBaseVolumeUsage();
    message.available = (object.available !== undefined && object.available !== null)
      ? Long.fromValue(object.available)
      : Long.ZERO;
    message.total = (object.total !== undefined && object.total !== null) ? Long.fromValue(object.total) : Long.ZERO;
    message.used = (object.used !== undefined && object.used !== null) ? Long.fromValue(object.used) : Long.ZERO;
    message.unit = object.unit ?? 0;
    return message;
  },
};

function createBaseVolumeCondition(): VolumeCondition {
  return { abnormal: false, message: "" };
}

export const VolumeCondition = {
  encode(message: VolumeCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.abnormal === true) {
      writer.uint32(8).bool(message.abnormal);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeCondition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.abnormal = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeCondition, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<VolumeCondition | VolumeCondition[]> | Iterable<VolumeCondition | VolumeCondition[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCondition.encode(p).finish()];
        }
      } else {
        yield* [VolumeCondition.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeCondition>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeCondition> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeCondition.decode(p)];
        }
      } else {
        yield* [VolumeCondition.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeCondition {
    return {
      abnormal: isSet(object.abnormal) ? Boolean(object.abnormal) : false,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: VolumeCondition): unknown {
    const obj: any = {};
    message.abnormal !== undefined && (obj.abnormal = message.abnormal);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeCondition>, I>>(base?: I): VolumeCondition {
    return VolumeCondition.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeCondition>, I>>(object: I): VolumeCondition {
    const message = createBaseVolumeCondition();
    message.abnormal = object.abnormal ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseNodeGetCapabilitiesRequest(): NodeGetCapabilitiesRequest {
  return {};
}

export const NodeGetCapabilitiesRequest = {
  encode(_: NodeGetCapabilitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetCapabilitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetCapabilitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetCapabilitiesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetCapabilitiesRequest | NodeGetCapabilitiesRequest[]>
      | Iterable<NodeGetCapabilitiesRequest | NodeGetCapabilitiesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetCapabilitiesRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeGetCapabilitiesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetCapabilitiesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetCapabilitiesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetCapabilitiesRequest.decode(p)];
        }
      } else {
        yield* [NodeGetCapabilitiesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodeGetCapabilitiesRequest {
    return {};
  },

  toJSON(_: NodeGetCapabilitiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetCapabilitiesRequest>, I>>(base?: I): NodeGetCapabilitiesRequest {
    return NodeGetCapabilitiesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetCapabilitiesRequest>, I>>(_: I): NodeGetCapabilitiesRequest {
    const message = createBaseNodeGetCapabilitiesRequest();
    return message;
  },
};

function createBaseNodeGetCapabilitiesResponse(): NodeGetCapabilitiesResponse {
  return { capabilities: [] };
}

export const NodeGetCapabilitiesResponse = {
  encode(message: NodeGetCapabilitiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.capabilities) {
      NodeServiceCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetCapabilitiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetCapabilitiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.capabilities.push(NodeServiceCapability.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetCapabilitiesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetCapabilitiesResponse | NodeGetCapabilitiesResponse[]>
      | Iterable<NodeGetCapabilitiesResponse | NodeGetCapabilitiesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetCapabilitiesResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeGetCapabilitiesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetCapabilitiesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetCapabilitiesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetCapabilitiesResponse.decode(p)];
        }
      } else {
        yield* [NodeGetCapabilitiesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeGetCapabilitiesResponse {
    return {
      capabilities: Array.isArray(object?.capabilities)
        ? object.capabilities.map((e: any) => NodeServiceCapability.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NodeGetCapabilitiesResponse): unknown {
    const obj: any = {};
    if (message.capabilities) {
      obj.capabilities = message.capabilities.map((e) => e ? NodeServiceCapability.toJSON(e) : undefined);
    } else {
      obj.capabilities = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetCapabilitiesResponse>, I>>(base?: I): NodeGetCapabilitiesResponse {
    return NodeGetCapabilitiesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetCapabilitiesResponse>, I>>(object: I): NodeGetCapabilitiesResponse {
    const message = createBaseNodeGetCapabilitiesResponse();
    message.capabilities = object.capabilities?.map((e) => NodeServiceCapability.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeServiceCapability(): NodeServiceCapability {
  return { type: undefined };
}

export const NodeServiceCapability = {
  encode(message: NodeServiceCapability, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.type?.$case) {
      case "rpc":
        NodeServiceCapability_RPC.encode(message.type.rpc, writer.uint32(10).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceCapability {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = { $case: "rpc", rpc: NodeServiceCapability_RPC.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeServiceCapability, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeServiceCapability | NodeServiceCapability[]>
      | Iterable<NodeServiceCapability | NodeServiceCapability[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeServiceCapability.encode(p).finish()];
        }
      } else {
        yield* [NodeServiceCapability.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeServiceCapability>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeServiceCapability> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeServiceCapability.decode(p)];
        }
      } else {
        yield* [NodeServiceCapability.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeServiceCapability {
    return {
      type: isSet(object.rpc) ? { $case: "rpc", rpc: NodeServiceCapability_RPC.fromJSON(object.rpc) } : undefined,
    };
  },

  toJSON(message: NodeServiceCapability): unknown {
    const obj: any = {};
    message.type?.$case === "rpc" &&
      (obj.rpc = message.type?.rpc ? NodeServiceCapability_RPC.toJSON(message.type?.rpc) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeServiceCapability>, I>>(base?: I): NodeServiceCapability {
    return NodeServiceCapability.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeServiceCapability>, I>>(object: I): NodeServiceCapability {
    const message = createBaseNodeServiceCapability();
    if (object.type?.$case === "rpc" && object.type?.rpc !== undefined && object.type?.rpc !== null) {
      message.type = { $case: "rpc", rpc: NodeServiceCapability_RPC.fromPartial(object.type.rpc) };
    }
    return message;
  },
};

function createBaseNodeServiceCapability_RPC(): NodeServiceCapability_RPC {
  return { type: 0 };
}

export const NodeServiceCapability_RPC = {
  encode(message: NodeServiceCapability_RPC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceCapability_RPC {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCapability_RPC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeServiceCapability_RPC, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeServiceCapability_RPC | NodeServiceCapability_RPC[]>
      | Iterable<NodeServiceCapability_RPC | NodeServiceCapability_RPC[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeServiceCapability_RPC.encode(p).finish()];
        }
      } else {
        yield* [NodeServiceCapability_RPC.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeServiceCapability_RPC>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeServiceCapability_RPC> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeServiceCapability_RPC.decode(p)];
        }
      } else {
        yield* [NodeServiceCapability_RPC.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeServiceCapability_RPC {
    return { type: isSet(object.type) ? nodeServiceCapability_RPC_TypeFromJSON(object.type) : 0 };
  },

  toJSON(message: NodeServiceCapability_RPC): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = nodeServiceCapability_RPC_TypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeServiceCapability_RPC>, I>>(base?: I): NodeServiceCapability_RPC {
    return NodeServiceCapability_RPC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeServiceCapability_RPC>, I>>(object: I): NodeServiceCapability_RPC {
    const message = createBaseNodeServiceCapability_RPC();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseNodeGetInfoRequest(): NodeGetInfoRequest {
  return {};
}

export const NodeGetInfoRequest = {
  encode(_: NodeGetInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetInfoRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetInfoRequest | NodeGetInfoRequest[]>
      | Iterable<NodeGetInfoRequest | NodeGetInfoRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetInfoRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeGetInfoRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetInfoRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetInfoRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetInfoRequest.decode(p)];
        }
      } else {
        yield* [NodeGetInfoRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): NodeGetInfoRequest {
    return {};
  },

  toJSON(_: NodeGetInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetInfoRequest>, I>>(base?: I): NodeGetInfoRequest {
    return NodeGetInfoRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetInfoRequest>, I>>(_: I): NodeGetInfoRequest {
    const message = createBaseNodeGetInfoRequest();
    return message;
  },
};

function createBaseNodeGetInfoResponse(): NodeGetInfoResponse {
  return { nodeId: "", maxVolumesPerNode: Long.ZERO, accessibleTopology: undefined };
}

export const NodeGetInfoResponse = {
  encode(message: NodeGetInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (!message.maxVolumesPerNode.isZero()) {
      writer.uint32(16).int64(message.maxVolumesPerNode);
    }
    if (message.accessibleTopology !== undefined) {
      Topology.encode(message.accessibleTopology, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGetInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGetInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxVolumesPerNode = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accessibleTopology = Topology.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeGetInfoResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeGetInfoResponse | NodeGetInfoResponse[]>
      | Iterable<NodeGetInfoResponse | NodeGetInfoResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetInfoResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeGetInfoResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeGetInfoResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeGetInfoResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeGetInfoResponse.decode(p)];
        }
      } else {
        yield* [NodeGetInfoResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeGetInfoResponse {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      maxVolumesPerNode: isSet(object.maxVolumesPerNode) ? Long.fromValue(object.maxVolumesPerNode) : Long.ZERO,
      accessibleTopology: isSet(object.accessibleTopology) ? Topology.fromJSON(object.accessibleTopology) : undefined,
    };
  },

  toJSON(message: NodeGetInfoResponse): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.maxVolumesPerNode !== undefined &&
      (obj.maxVolumesPerNode = (message.maxVolumesPerNode || Long.ZERO).toString());
    message.accessibleTopology !== undefined &&
      (obj.accessibleTopology = message.accessibleTopology ? Topology.toJSON(message.accessibleTopology) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeGetInfoResponse>, I>>(base?: I): NodeGetInfoResponse {
    return NodeGetInfoResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeGetInfoResponse>, I>>(object: I): NodeGetInfoResponse {
    const message = createBaseNodeGetInfoResponse();
    message.nodeId = object.nodeId ?? "";
    message.maxVolumesPerNode = (object.maxVolumesPerNode !== undefined && object.maxVolumesPerNode !== null)
      ? Long.fromValue(object.maxVolumesPerNode)
      : Long.ZERO;
    message.accessibleTopology = (object.accessibleTopology !== undefined && object.accessibleTopology !== null)
      ? Topology.fromPartial(object.accessibleTopology)
      : undefined;
    return message;
  },
};

function createBaseNodeExpandVolumeRequest(): NodeExpandVolumeRequest {
  return {
    volumeId: "",
    volumePath: "",
    capacityRange: undefined,
    stagingTargetPath: "",
    volumeCapability: undefined,
    secrets: {},
  };
}

export const NodeExpandVolumeRequest = {
  encode(message: NodeExpandVolumeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.volumeId !== "") {
      writer.uint32(10).string(message.volumeId);
    }
    if (message.volumePath !== "") {
      writer.uint32(18).string(message.volumePath);
    }
    if (message.capacityRange !== undefined) {
      CapacityRange.encode(message.capacityRange, writer.uint32(26).fork()).ldelim();
    }
    if (message.stagingTargetPath !== "") {
      writer.uint32(34).string(message.stagingTargetPath);
    }
    if (message.volumeCapability !== undefined) {
      VolumeCapability.encode(message.volumeCapability, writer.uint32(42).fork()).ldelim();
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      NodeExpandVolumeRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeExpandVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeExpandVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volumeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.volumePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.capacityRange = CapacityRange.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.stagingTargetPath = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.volumeCapability = VolumeCapability.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = NodeExpandVolumeRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.secrets[entry6.key] = entry6.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeExpandVolumeRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeExpandVolumeRequest | NodeExpandVolumeRequest[]>
      | Iterable<NodeExpandVolumeRequest | NodeExpandVolumeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeRequest.encode(p).finish()];
        }
      } else {
        yield* [NodeExpandVolumeRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeExpandVolumeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeExpandVolumeRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeRequest.decode(p)];
        }
      } else {
        yield* [NodeExpandVolumeRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeExpandVolumeRequest {
    return {
      volumeId: isSet(object.volumeId) ? String(object.volumeId) : "",
      volumePath: isSet(object.volumePath) ? String(object.volumePath) : "",
      capacityRange: isSet(object.capacityRange) ? CapacityRange.fromJSON(object.capacityRange) : undefined,
      stagingTargetPath: isSet(object.stagingTargetPath) ? String(object.stagingTargetPath) : "",
      volumeCapability: isSet(object.volumeCapability) ? VolumeCapability.fromJSON(object.volumeCapability) : undefined,
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: NodeExpandVolumeRequest): unknown {
    const obj: any = {};
    message.volumeId !== undefined && (obj.volumeId = message.volumeId);
    message.volumePath !== undefined && (obj.volumePath = message.volumePath);
    message.capacityRange !== undefined &&
      (obj.capacityRange = message.capacityRange ? CapacityRange.toJSON(message.capacityRange) : undefined);
    message.stagingTargetPath !== undefined && (obj.stagingTargetPath = message.stagingTargetPath);
    message.volumeCapability !== undefined &&
      (obj.volumeCapability = message.volumeCapability ? VolumeCapability.toJSON(message.volumeCapability) : undefined);
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeExpandVolumeRequest>, I>>(base?: I): NodeExpandVolumeRequest {
    return NodeExpandVolumeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeExpandVolumeRequest>, I>>(object: I): NodeExpandVolumeRequest {
    const message = createBaseNodeExpandVolumeRequest();
    message.volumeId = object.volumeId ?? "";
    message.volumePath = object.volumePath ?? "";
    message.capacityRange = (object.capacityRange !== undefined && object.capacityRange !== null)
      ? CapacityRange.fromPartial(object.capacityRange)
      : undefined;
    message.stagingTargetPath = object.stagingTargetPath ?? "";
    message.volumeCapability = (object.volumeCapability !== undefined && object.volumeCapability !== null)
      ? VolumeCapability.fromPartial(object.volumeCapability)
      : undefined;
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseNodeExpandVolumeRequest_SecretsEntry(): NodeExpandVolumeRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const NodeExpandVolumeRequest_SecretsEntry = {
  encode(message: NodeExpandVolumeRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeExpandVolumeRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeExpandVolumeRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeExpandVolumeRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeExpandVolumeRequest_SecretsEntry | NodeExpandVolumeRequest_SecretsEntry[]>
      | Iterable<NodeExpandVolumeRequest_SecretsEntry | NodeExpandVolumeRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [NodeExpandVolumeRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeExpandVolumeRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeExpandVolumeRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [NodeExpandVolumeRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeExpandVolumeRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: NodeExpandVolumeRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeExpandVolumeRequest_SecretsEntry>, I>>(
    base?: I,
  ): NodeExpandVolumeRequest_SecretsEntry {
    return NodeExpandVolumeRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeExpandVolumeRequest_SecretsEntry>, I>>(
    object: I,
  ): NodeExpandVolumeRequest_SecretsEntry {
    const message = createBaseNodeExpandVolumeRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodeExpandVolumeResponse(): NodeExpandVolumeResponse {
  return { capacityBytes: Long.ZERO };
}

export const NodeExpandVolumeResponse = {
  encode(message: NodeExpandVolumeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.capacityBytes.isZero()) {
      writer.uint32(8).int64(message.capacityBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeExpandVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeExpandVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.capacityBytes = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<NodeExpandVolumeResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<NodeExpandVolumeResponse | NodeExpandVolumeResponse[]>
      | Iterable<NodeExpandVolumeResponse | NodeExpandVolumeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeResponse.encode(p).finish()];
        }
      } else {
        yield* [NodeExpandVolumeResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, NodeExpandVolumeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<NodeExpandVolumeResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [NodeExpandVolumeResponse.decode(p)];
        }
      } else {
        yield* [NodeExpandVolumeResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): NodeExpandVolumeResponse {
    return { capacityBytes: isSet(object.capacityBytes) ? Long.fromValue(object.capacityBytes) : Long.ZERO };
  },

  toJSON(message: NodeExpandVolumeResponse): unknown {
    const obj: any = {};
    message.capacityBytes !== undefined && (obj.capacityBytes = (message.capacityBytes || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeExpandVolumeResponse>, I>>(base?: I): NodeExpandVolumeResponse {
    return NodeExpandVolumeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeExpandVolumeResponse>, I>>(object: I): NodeExpandVolumeResponse {
    const message = createBaseNodeExpandVolumeResponse();
    message.capacityBytes = (object.capacityBytes !== undefined && object.capacityBytes !== null)
      ? Long.fromValue(object.capacityBytes)
      : Long.ZERO;
    return message;
  },
};

function createBaseGroupControllerGetCapabilitiesRequest(): GroupControllerGetCapabilitiesRequest {
  return {};
}

export const GroupControllerGetCapabilitiesRequest = {
  encode(_: GroupControllerGetCapabilitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupControllerGetCapabilitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupControllerGetCapabilitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GroupControllerGetCapabilitiesRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GroupControllerGetCapabilitiesRequest | GroupControllerGetCapabilitiesRequest[]>
      | Iterable<GroupControllerGetCapabilitiesRequest | GroupControllerGetCapabilitiesRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerGetCapabilitiesRequest.encode(p).finish()];
        }
      } else {
        yield* [GroupControllerGetCapabilitiesRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GroupControllerGetCapabilitiesRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GroupControllerGetCapabilitiesRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerGetCapabilitiesRequest.decode(p)];
        }
      } else {
        yield* [GroupControllerGetCapabilitiesRequest.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): GroupControllerGetCapabilitiesRequest {
    return {};
  },

  toJSON(_: GroupControllerGetCapabilitiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupControllerGetCapabilitiesRequest>, I>>(
    base?: I,
  ): GroupControllerGetCapabilitiesRequest {
    return GroupControllerGetCapabilitiesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GroupControllerGetCapabilitiesRequest>, I>>(
    _: I,
  ): GroupControllerGetCapabilitiesRequest {
    const message = createBaseGroupControllerGetCapabilitiesRequest();
    return message;
  },
};

function createBaseGroupControllerGetCapabilitiesResponse(): GroupControllerGetCapabilitiesResponse {
  return { capabilities: [] };
}

export const GroupControllerGetCapabilitiesResponse = {
  encode(message: GroupControllerGetCapabilitiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.capabilities) {
      GroupControllerServiceCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupControllerGetCapabilitiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupControllerGetCapabilitiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.capabilities.push(GroupControllerServiceCapability.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GroupControllerGetCapabilitiesResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GroupControllerGetCapabilitiesResponse | GroupControllerGetCapabilitiesResponse[]>
      | Iterable<GroupControllerGetCapabilitiesResponse | GroupControllerGetCapabilitiesResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerGetCapabilitiesResponse.encode(p).finish()];
        }
      } else {
        yield* [GroupControllerGetCapabilitiesResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GroupControllerGetCapabilitiesResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GroupControllerGetCapabilitiesResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerGetCapabilitiesResponse.decode(p)];
        }
      } else {
        yield* [GroupControllerGetCapabilitiesResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GroupControllerGetCapabilitiesResponse {
    return {
      capabilities: Array.isArray(object?.capabilities)
        ? object.capabilities.map((e: any) => GroupControllerServiceCapability.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GroupControllerGetCapabilitiesResponse): unknown {
    const obj: any = {};
    if (message.capabilities) {
      obj.capabilities = message.capabilities.map((e) => e ? GroupControllerServiceCapability.toJSON(e) : undefined);
    } else {
      obj.capabilities = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupControllerGetCapabilitiesResponse>, I>>(
    base?: I,
  ): GroupControllerGetCapabilitiesResponse {
    return GroupControllerGetCapabilitiesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GroupControllerGetCapabilitiesResponse>, I>>(
    object: I,
  ): GroupControllerGetCapabilitiesResponse {
    const message = createBaseGroupControllerGetCapabilitiesResponse();
    message.capabilities = object.capabilities?.map((e) => GroupControllerServiceCapability.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGroupControllerServiceCapability(): GroupControllerServiceCapability {
  return { type: undefined };
}

export const GroupControllerServiceCapability = {
  encode(message: GroupControllerServiceCapability, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.type?.$case) {
      case "rpc":
        GroupControllerServiceCapability_RPC.encode(message.type.rpc, writer.uint32(10).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupControllerServiceCapability {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupControllerServiceCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = { $case: "rpc", rpc: GroupControllerServiceCapability_RPC.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GroupControllerServiceCapability, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GroupControllerServiceCapability | GroupControllerServiceCapability[]>
      | Iterable<GroupControllerServiceCapability | GroupControllerServiceCapability[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerServiceCapability.encode(p).finish()];
        }
      } else {
        yield* [GroupControllerServiceCapability.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GroupControllerServiceCapability>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GroupControllerServiceCapability> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerServiceCapability.decode(p)];
        }
      } else {
        yield* [GroupControllerServiceCapability.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GroupControllerServiceCapability {
    return {
      type: isSet(object.rpc)
        ? { $case: "rpc", rpc: GroupControllerServiceCapability_RPC.fromJSON(object.rpc) }
        : undefined,
    };
  },

  toJSON(message: GroupControllerServiceCapability): unknown {
    const obj: any = {};
    message.type?.$case === "rpc" &&
      (obj.rpc = message.type?.rpc ? GroupControllerServiceCapability_RPC.toJSON(message.type?.rpc) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupControllerServiceCapability>, I>>(
    base?: I,
  ): GroupControllerServiceCapability {
    return GroupControllerServiceCapability.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GroupControllerServiceCapability>, I>>(
    object: I,
  ): GroupControllerServiceCapability {
    const message = createBaseGroupControllerServiceCapability();
    if (object.type?.$case === "rpc" && object.type?.rpc !== undefined && object.type?.rpc !== null) {
      message.type = { $case: "rpc", rpc: GroupControllerServiceCapability_RPC.fromPartial(object.type.rpc) };
    }
    return message;
  },
};

function createBaseGroupControllerServiceCapability_RPC(): GroupControllerServiceCapability_RPC {
  return { type: 0 };
}

export const GroupControllerServiceCapability_RPC = {
  encode(message: GroupControllerServiceCapability_RPC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupControllerServiceCapability_RPC {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupControllerServiceCapability_RPC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GroupControllerServiceCapability_RPC, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GroupControllerServiceCapability_RPC | GroupControllerServiceCapability_RPC[]>
      | Iterable<GroupControllerServiceCapability_RPC | GroupControllerServiceCapability_RPC[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerServiceCapability_RPC.encode(p).finish()];
        }
      } else {
        yield* [GroupControllerServiceCapability_RPC.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GroupControllerServiceCapability_RPC>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GroupControllerServiceCapability_RPC> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GroupControllerServiceCapability_RPC.decode(p)];
        }
      } else {
        yield* [GroupControllerServiceCapability_RPC.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GroupControllerServiceCapability_RPC {
    return { type: isSet(object.type) ? groupControllerServiceCapability_RPC_TypeFromJSON(object.type) : 0 };
  },

  toJSON(message: GroupControllerServiceCapability_RPC): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = groupControllerServiceCapability_RPC_TypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupControllerServiceCapability_RPC>, I>>(
    base?: I,
  ): GroupControllerServiceCapability_RPC {
    return GroupControllerServiceCapability_RPC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GroupControllerServiceCapability_RPC>, I>>(
    object: I,
  ): GroupControllerServiceCapability_RPC {
    const message = createBaseGroupControllerServiceCapability_RPC();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseCreateVolumeGroupSnapshotRequest(): CreateVolumeGroupSnapshotRequest {
  return { name: "", sourceVolumeIds: [], secrets: {}, parameters: {} };
}

export const CreateVolumeGroupSnapshotRequest = {
  encode(message: CreateVolumeGroupSnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.sourceVolumeIds) {
      writer.uint32(18).string(v!);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      CreateVolumeGroupSnapshotRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork())
        .ldelim();
    });
    Object.entries(message.parameters).forEach(([key, value]) => {
      CreateVolumeGroupSnapshotRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeGroupSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeGroupSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sourceVolumeIds.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = CreateVolumeGroupSnapshotRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = CreateVolumeGroupSnapshotRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeGroupSnapshotRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeGroupSnapshotRequest | CreateVolumeGroupSnapshotRequest[]>
      | Iterable<CreateVolumeGroupSnapshotRequest | CreateVolumeGroupSnapshotRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeGroupSnapshotRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeGroupSnapshotRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest.decode(p)];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeGroupSnapshotRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      sourceVolumeIds: Array.isArray(object?.sourceVolumeIds) ? object.sourceVolumeIds.map((e: any) => String(e)) : [],
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CreateVolumeGroupSnapshotRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.sourceVolumeIds) {
      obj.sourceVolumeIds = message.sourceVolumeIds.map((e) => e);
    } else {
      obj.sourceVolumeIds = [];
    }
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest>, I>>(
    base?: I,
  ): CreateVolumeGroupSnapshotRequest {
    return CreateVolumeGroupSnapshotRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest>, I>>(
    object: I,
  ): CreateVolumeGroupSnapshotRequest {
    const message = createBaseCreateVolumeGroupSnapshotRequest();
    message.name = object.name ?? "";
    message.sourceVolumeIds = object.sourceVolumeIds?.map((e) => e) || [];
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseCreateVolumeGroupSnapshotRequest_SecretsEntry(): CreateVolumeGroupSnapshotRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const CreateVolumeGroupSnapshotRequest_SecretsEntry = {
  encode(message: CreateVolumeGroupSnapshotRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeGroupSnapshotRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeGroupSnapshotRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeGroupSnapshotRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeGroupSnapshotRequest_SecretsEntry | CreateVolumeGroupSnapshotRequest_SecretsEntry[]>
      | Iterable<CreateVolumeGroupSnapshotRequest_SecretsEntry | CreateVolumeGroupSnapshotRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeGroupSnapshotRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeGroupSnapshotRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeGroupSnapshotRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateVolumeGroupSnapshotRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    base?: I,
  ): CreateVolumeGroupSnapshotRequest_SecretsEntry {
    return CreateVolumeGroupSnapshotRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    object: I,
  ): CreateVolumeGroupSnapshotRequest_SecretsEntry {
    const message = createBaseCreateVolumeGroupSnapshotRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateVolumeGroupSnapshotRequest_ParametersEntry(): CreateVolumeGroupSnapshotRequest_ParametersEntry {
  return { key: "", value: "" };
}

export const CreateVolumeGroupSnapshotRequest_ParametersEntry = {
  encode(
    message: CreateVolumeGroupSnapshotRequest_ParametersEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeGroupSnapshotRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeGroupSnapshotRequest_ParametersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeGroupSnapshotRequest_ParametersEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<
        CreateVolumeGroupSnapshotRequest_ParametersEntry | CreateVolumeGroupSnapshotRequest_ParametersEntry[]
      >
      | Iterable<CreateVolumeGroupSnapshotRequest_ParametersEntry | CreateVolumeGroupSnapshotRequest_ParametersEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest_ParametersEntry.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest_ParametersEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeGroupSnapshotRequest_ParametersEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeGroupSnapshotRequest_ParametersEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotRequest_ParametersEntry.decode(p)];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotRequest_ParametersEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeGroupSnapshotRequest_ParametersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateVolumeGroupSnapshotRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest_ParametersEntry>, I>>(
    base?: I,
  ): CreateVolumeGroupSnapshotRequest_ParametersEntry {
    return CreateVolumeGroupSnapshotRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotRequest_ParametersEntry>, I>>(
    object: I,
  ): CreateVolumeGroupSnapshotRequest_ParametersEntry {
    const message = createBaseCreateVolumeGroupSnapshotRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateVolumeGroupSnapshotResponse(): CreateVolumeGroupSnapshotResponse {
  return { groupSnapshot: undefined };
}

export const CreateVolumeGroupSnapshotResponse = {
  encode(message: CreateVolumeGroupSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupSnapshot !== undefined) {
      VolumeGroupSnapshot.encode(message.groupSnapshot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateVolumeGroupSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateVolumeGroupSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupSnapshot = VolumeGroupSnapshot.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CreateVolumeGroupSnapshotResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CreateVolumeGroupSnapshotResponse | CreateVolumeGroupSnapshotResponse[]>
      | Iterable<CreateVolumeGroupSnapshotResponse | CreateVolumeGroupSnapshotResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotResponse.encode(p).finish()];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CreateVolumeGroupSnapshotResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CreateVolumeGroupSnapshotResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [CreateVolumeGroupSnapshotResponse.decode(p)];
        }
      } else {
        yield* [CreateVolumeGroupSnapshotResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): CreateVolumeGroupSnapshotResponse {
    return {
      groupSnapshot: isSet(object.groupSnapshot) ? VolumeGroupSnapshot.fromJSON(object.groupSnapshot) : undefined,
    };
  },

  toJSON(message: CreateVolumeGroupSnapshotResponse): unknown {
    const obj: any = {};
    message.groupSnapshot !== undefined &&
      (obj.groupSnapshot = message.groupSnapshot ? VolumeGroupSnapshot.toJSON(message.groupSnapshot) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotResponse>, I>>(
    base?: I,
  ): CreateVolumeGroupSnapshotResponse {
    return CreateVolumeGroupSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateVolumeGroupSnapshotResponse>, I>>(
    object: I,
  ): CreateVolumeGroupSnapshotResponse {
    const message = createBaseCreateVolumeGroupSnapshotResponse();
    message.groupSnapshot = (object.groupSnapshot !== undefined && object.groupSnapshot !== null)
      ? VolumeGroupSnapshot.fromPartial(object.groupSnapshot)
      : undefined;
    return message;
  },
};

function createBaseVolumeGroupSnapshot(): VolumeGroupSnapshot {
  return { groupSnapshotId: "", snapshots: [], creationTime: undefined, readyToUse: false };
}

export const VolumeGroupSnapshot = {
  encode(message: VolumeGroupSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupSnapshotId !== "") {
      writer.uint32(10).string(message.groupSnapshotId);
    }
    for (const v of message.snapshots) {
      Snapshot.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.readyToUse === true) {
      writer.uint32(32).bool(message.readyToUse);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeGroupSnapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeGroupSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupSnapshotId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.snapshots.push(Snapshot.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.readyToUse = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<VolumeGroupSnapshot, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<VolumeGroupSnapshot | VolumeGroupSnapshot[]>
      | Iterable<VolumeGroupSnapshot | VolumeGroupSnapshot[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeGroupSnapshot.encode(p).finish()];
        }
      } else {
        yield* [VolumeGroupSnapshot.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, VolumeGroupSnapshot>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<VolumeGroupSnapshot> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [VolumeGroupSnapshot.decode(p)];
        }
      } else {
        yield* [VolumeGroupSnapshot.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): VolumeGroupSnapshot {
    return {
      groupSnapshotId: isSet(object.groupSnapshotId) ? String(object.groupSnapshotId) : "",
      snapshots: Array.isArray(object?.snapshots) ? object.snapshots.map((e: any) => Snapshot.fromJSON(e)) : [],
      creationTime: isSet(object.creationTime) ? fromJsonTimestamp(object.creationTime) : undefined,
      readyToUse: isSet(object.readyToUse) ? Boolean(object.readyToUse) : false,
    };
  },

  toJSON(message: VolumeGroupSnapshot): unknown {
    const obj: any = {};
    message.groupSnapshotId !== undefined && (obj.groupSnapshotId = message.groupSnapshotId);
    if (message.snapshots) {
      obj.snapshots = message.snapshots.map((e) => e ? Snapshot.toJSON(e) : undefined);
    } else {
      obj.snapshots = [];
    }
    message.creationTime !== undefined && (obj.creationTime = message.creationTime.toISOString());
    message.readyToUse !== undefined && (obj.readyToUse = message.readyToUse);
    return obj;
  },

  create<I extends Exact<DeepPartial<VolumeGroupSnapshot>, I>>(base?: I): VolumeGroupSnapshot {
    return VolumeGroupSnapshot.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VolumeGroupSnapshot>, I>>(object: I): VolumeGroupSnapshot {
    const message = createBaseVolumeGroupSnapshot();
    message.groupSnapshotId = object.groupSnapshotId ?? "";
    message.snapshots = object.snapshots?.map((e) => Snapshot.fromPartial(e)) || [];
    message.creationTime = object.creationTime ?? undefined;
    message.readyToUse = object.readyToUse ?? false;
    return message;
  },
};

function createBaseDeleteVolumeGroupSnapshotRequest(): DeleteVolumeGroupSnapshotRequest {
  return { groupSnapshotId: "", snapshotIds: [], secrets: {} };
}

export const DeleteVolumeGroupSnapshotRequest = {
  encode(message: DeleteVolumeGroupSnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupSnapshotId !== "") {
      writer.uint32(10).string(message.groupSnapshotId);
    }
    for (const v of message.snapshotIds) {
      writer.uint32(18).string(v!);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      DeleteVolumeGroupSnapshotRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeGroupSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeGroupSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupSnapshotId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.snapshotIds.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = DeleteVolumeGroupSnapshotRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeGroupSnapshotRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeGroupSnapshotRequest | DeleteVolumeGroupSnapshotRequest[]>
      | Iterable<DeleteVolumeGroupSnapshotRequest | DeleteVolumeGroupSnapshotRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotRequest.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeGroupSnapshotRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeGroupSnapshotRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotRequest.decode(p)];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteVolumeGroupSnapshotRequest {
    return {
      groupSnapshotId: isSet(object.groupSnapshotId) ? String(object.groupSnapshotId) : "",
      snapshotIds: Array.isArray(object?.snapshotIds) ? object.snapshotIds.map((e: any) => String(e)) : [],
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DeleteVolumeGroupSnapshotRequest): unknown {
    const obj: any = {};
    message.groupSnapshotId !== undefined && (obj.groupSnapshotId = message.groupSnapshotId);
    if (message.snapshotIds) {
      obj.snapshotIds = message.snapshotIds.map((e) => e);
    } else {
      obj.snapshotIds = [];
    }
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotRequest>, I>>(
    base?: I,
  ): DeleteVolumeGroupSnapshotRequest {
    return DeleteVolumeGroupSnapshotRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotRequest>, I>>(
    object: I,
  ): DeleteVolumeGroupSnapshotRequest {
    const message = createBaseDeleteVolumeGroupSnapshotRequest();
    message.groupSnapshotId = object.groupSnapshotId ?? "";
    message.snapshotIds = object.snapshotIds?.map((e) => e) || [];
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseDeleteVolumeGroupSnapshotRequest_SecretsEntry(): DeleteVolumeGroupSnapshotRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const DeleteVolumeGroupSnapshotRequest_SecretsEntry = {
  encode(message: DeleteVolumeGroupSnapshotRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeGroupSnapshotRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeGroupSnapshotRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeGroupSnapshotRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeGroupSnapshotRequest_SecretsEntry | DeleteVolumeGroupSnapshotRequest_SecretsEntry[]>
      | Iterable<DeleteVolumeGroupSnapshotRequest_SecretsEntry | DeleteVolumeGroupSnapshotRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeGroupSnapshotRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeGroupSnapshotRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): DeleteVolumeGroupSnapshotRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: DeleteVolumeGroupSnapshotRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    base?: I,
  ): DeleteVolumeGroupSnapshotRequest_SecretsEntry {
    return DeleteVolumeGroupSnapshotRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    object: I,
  ): DeleteVolumeGroupSnapshotRequest_SecretsEntry {
    const message = createBaseDeleteVolumeGroupSnapshotRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteVolumeGroupSnapshotResponse(): DeleteVolumeGroupSnapshotResponse {
  return {};
}

export const DeleteVolumeGroupSnapshotResponse = {
  encode(_: DeleteVolumeGroupSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteVolumeGroupSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteVolumeGroupSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<DeleteVolumeGroupSnapshotResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<DeleteVolumeGroupSnapshotResponse | DeleteVolumeGroupSnapshotResponse[]>
      | Iterable<DeleteVolumeGroupSnapshotResponse | DeleteVolumeGroupSnapshotResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotResponse.encode(p).finish()];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, DeleteVolumeGroupSnapshotResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<DeleteVolumeGroupSnapshotResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [DeleteVolumeGroupSnapshotResponse.decode(p)];
        }
      } else {
        yield* [DeleteVolumeGroupSnapshotResponse.decode(pkt)];
      }
    }
  },

  fromJSON(_: any): DeleteVolumeGroupSnapshotResponse {
    return {};
  },

  toJSON(_: DeleteVolumeGroupSnapshotResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotResponse>, I>>(
    base?: I,
  ): DeleteVolumeGroupSnapshotResponse {
    return DeleteVolumeGroupSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteVolumeGroupSnapshotResponse>, I>>(
    _: I,
  ): DeleteVolumeGroupSnapshotResponse {
    const message = createBaseDeleteVolumeGroupSnapshotResponse();
    return message;
  },
};

function createBaseGetVolumeGroupSnapshotRequest(): GetVolumeGroupSnapshotRequest {
  return { groupSnapshotId: "", snapshotIds: [], secrets: {} };
}

export const GetVolumeGroupSnapshotRequest = {
  encode(message: GetVolumeGroupSnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupSnapshotId !== "") {
      writer.uint32(10).string(message.groupSnapshotId);
    }
    for (const v of message.snapshotIds) {
      writer.uint32(18).string(v!);
    }
    Object.entries(message.secrets).forEach(([key, value]) => {
      GetVolumeGroupSnapshotRequest_SecretsEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVolumeGroupSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVolumeGroupSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupSnapshotId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.snapshotIds.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = GetVolumeGroupSnapshotRequest_SecretsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.secrets[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetVolumeGroupSnapshotRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetVolumeGroupSnapshotRequest | GetVolumeGroupSnapshotRequest[]>
      | Iterable<GetVolumeGroupSnapshotRequest | GetVolumeGroupSnapshotRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotRequest.encode(p).finish()];
        }
      } else {
        yield* [GetVolumeGroupSnapshotRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetVolumeGroupSnapshotRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetVolumeGroupSnapshotRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotRequest.decode(p)];
        }
      } else {
        yield* [GetVolumeGroupSnapshotRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetVolumeGroupSnapshotRequest {
    return {
      groupSnapshotId: isSet(object.groupSnapshotId) ? String(object.groupSnapshotId) : "",
      snapshotIds: Array.isArray(object?.snapshotIds) ? object.snapshotIds.map((e: any) => String(e)) : [],
      secrets: isObject(object.secrets)
        ? Object.entries(object.secrets).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GetVolumeGroupSnapshotRequest): unknown {
    const obj: any = {};
    message.groupSnapshotId !== undefined && (obj.groupSnapshotId = message.groupSnapshotId);
    if (message.snapshotIds) {
      obj.snapshotIds = message.snapshotIds.map((e) => e);
    } else {
      obj.snapshotIds = [];
    }
    obj.secrets = {};
    if (message.secrets) {
      Object.entries(message.secrets).forEach(([k, v]) => {
        obj.secrets[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVolumeGroupSnapshotRequest>, I>>(base?: I): GetVolumeGroupSnapshotRequest {
    return GetVolumeGroupSnapshotRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetVolumeGroupSnapshotRequest>, I>>(
    object: I,
  ): GetVolumeGroupSnapshotRequest {
    const message = createBaseGetVolumeGroupSnapshotRequest();
    message.groupSnapshotId = object.groupSnapshotId ?? "";
    message.snapshotIds = object.snapshotIds?.map((e) => e) || [];
    message.secrets = Object.entries(object.secrets ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetVolumeGroupSnapshotRequest_SecretsEntry(): GetVolumeGroupSnapshotRequest_SecretsEntry {
  return { key: "", value: "" };
}

export const GetVolumeGroupSnapshotRequest_SecretsEntry = {
  encode(message: GetVolumeGroupSnapshotRequest_SecretsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVolumeGroupSnapshotRequest_SecretsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVolumeGroupSnapshotRequest_SecretsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetVolumeGroupSnapshotRequest_SecretsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetVolumeGroupSnapshotRequest_SecretsEntry | GetVolumeGroupSnapshotRequest_SecretsEntry[]>
      | Iterable<GetVolumeGroupSnapshotRequest_SecretsEntry | GetVolumeGroupSnapshotRequest_SecretsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotRequest_SecretsEntry.encode(p).finish()];
        }
      } else {
        yield* [GetVolumeGroupSnapshotRequest_SecretsEntry.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetVolumeGroupSnapshotRequest_SecretsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetVolumeGroupSnapshotRequest_SecretsEntry> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotRequest_SecretsEntry.decode(p)];
        }
      } else {
        yield* [GetVolumeGroupSnapshotRequest_SecretsEntry.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetVolumeGroupSnapshotRequest_SecretsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: GetVolumeGroupSnapshotRequest_SecretsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    base?: I,
  ): GetVolumeGroupSnapshotRequest_SecretsEntry {
    return GetVolumeGroupSnapshotRequest_SecretsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetVolumeGroupSnapshotRequest_SecretsEntry>, I>>(
    object: I,
  ): GetVolumeGroupSnapshotRequest_SecretsEntry {
    const message = createBaseGetVolumeGroupSnapshotRequest_SecretsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetVolumeGroupSnapshotResponse(): GetVolumeGroupSnapshotResponse {
  return { groupSnapshot: undefined };
}

export const GetVolumeGroupSnapshotResponse = {
  encode(message: GetVolumeGroupSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupSnapshot !== undefined) {
      VolumeGroupSnapshot.encode(message.groupSnapshot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVolumeGroupSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVolumeGroupSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupSnapshot = VolumeGroupSnapshot.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetVolumeGroupSnapshotResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetVolumeGroupSnapshotResponse | GetVolumeGroupSnapshotResponse[]>
      | Iterable<GetVolumeGroupSnapshotResponse | GetVolumeGroupSnapshotResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotResponse.encode(p).finish()];
        }
      } else {
        yield* [GetVolumeGroupSnapshotResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetVolumeGroupSnapshotResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetVolumeGroupSnapshotResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetVolumeGroupSnapshotResponse.decode(p)];
        }
      } else {
        yield* [GetVolumeGroupSnapshotResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetVolumeGroupSnapshotResponse {
    return {
      groupSnapshot: isSet(object.groupSnapshot) ? VolumeGroupSnapshot.fromJSON(object.groupSnapshot) : undefined,
    };
  },

  toJSON(message: GetVolumeGroupSnapshotResponse): unknown {
    const obj: any = {};
    message.groupSnapshot !== undefined &&
      (obj.groupSnapshot = message.groupSnapshot ? VolumeGroupSnapshot.toJSON(message.groupSnapshot) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVolumeGroupSnapshotResponse>, I>>(base?: I): GetVolumeGroupSnapshotResponse {
    return GetVolumeGroupSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetVolumeGroupSnapshotResponse>, I>>(
    object: I,
  ): GetVolumeGroupSnapshotResponse {
    const message = createBaseGetVolumeGroupSnapshotResponse();
    message.groupSnapshot = (object.groupSnapshot !== undefined && object.groupSnapshot !== null)
      ? VolumeGroupSnapshot.fromPartial(object.groupSnapshot)
      : undefined;
    return message;
  },
};

export interface Identity {
  GetPluginInfo(request: GetPluginInfoRequest, abortSignal?: AbortSignal): Promise<GetPluginInfoResponse>;
  GetPluginCapabilities(
    request: GetPluginCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<GetPluginCapabilitiesResponse>;
  Probe(request: ProbeRequest, abortSignal?: AbortSignal): Promise<ProbeResponse>;
}

export const IdentityServiceName = "csi.v1.Identity";
export class IdentityClientImpl implements Identity {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || IdentityServiceName;
    this.rpc = rpc;
    this.GetPluginInfo = this.GetPluginInfo.bind(this);
    this.GetPluginCapabilities = this.GetPluginCapabilities.bind(this);
    this.Probe = this.Probe.bind(this);
  }
  GetPluginInfo(request: GetPluginInfoRequest, abortSignal?: AbortSignal): Promise<GetPluginInfoResponse> {
    const data = GetPluginInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPluginInfo", data, abortSignal || undefined);
    return promise.then((data) => GetPluginInfoResponse.decode(_m0.Reader.create(data)));
  }

  GetPluginCapabilities(
    request: GetPluginCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<GetPluginCapabilitiesResponse> {
    const data = GetPluginCapabilitiesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPluginCapabilities", data, abortSignal || undefined);
    return promise.then((data) => GetPluginCapabilitiesResponse.decode(_m0.Reader.create(data)));
  }

  Probe(request: ProbeRequest, abortSignal?: AbortSignal): Promise<ProbeResponse> {
    const data = ProbeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Probe", data, abortSignal || undefined);
    return promise.then((data) => ProbeResponse.decode(_m0.Reader.create(data)));
  }
}

export type IdentityDefinition = typeof IdentityDefinition;
export const IdentityDefinition = {
  name: "Identity",
  fullName: "csi.v1.Identity",
  methods: {
    getPluginInfo: {
      name: "GetPluginInfo",
      requestType: GetPluginInfoRequest,
      requestStream: false,
      responseType: GetPluginInfoResponse,
      responseStream: false,
      options: {},
    },
    getPluginCapabilities: {
      name: "GetPluginCapabilities",
      requestType: GetPluginCapabilitiesRequest,
      requestStream: false,
      responseType: GetPluginCapabilitiesResponse,
      responseStream: false,
      options: {},
    },
    probe: {
      name: "Probe",
      requestType: ProbeRequest,
      requestStream: false,
      responseType: ProbeResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface Controller {
  CreateVolume(request: CreateVolumeRequest, abortSignal?: AbortSignal): Promise<CreateVolumeResponse>;
  DeleteVolume(request: DeleteVolumeRequest, abortSignal?: AbortSignal): Promise<DeleteVolumeResponse>;
  ControllerPublishVolume(
    request: ControllerPublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerPublishVolumeResponse>;
  ControllerUnpublishVolume(
    request: ControllerUnpublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerUnpublishVolumeResponse>;
  ValidateVolumeCapabilities(
    request: ValidateVolumeCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<ValidateVolumeCapabilitiesResponse>;
  ListVolumes(request: ListVolumesRequest, abortSignal?: AbortSignal): Promise<ListVolumesResponse>;
  GetCapacity(request: GetCapacityRequest, abortSignal?: AbortSignal): Promise<GetCapacityResponse>;
  ControllerGetCapabilities(
    request: ControllerGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerGetCapabilitiesResponse>;
  CreateSnapshot(request: CreateSnapshotRequest, abortSignal?: AbortSignal): Promise<CreateSnapshotResponse>;
  DeleteSnapshot(request: DeleteSnapshotRequest, abortSignal?: AbortSignal): Promise<DeleteSnapshotResponse>;
  ListSnapshots(request: ListSnapshotsRequest, abortSignal?: AbortSignal): Promise<ListSnapshotsResponse>;
  ControllerExpandVolume(
    request: ControllerExpandVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerExpandVolumeResponse>;
  ControllerGetVolume(
    request: ControllerGetVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerGetVolumeResponse>;
}

export const ControllerServiceName = "csi.v1.Controller";
export class ControllerClientImpl implements Controller {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || ControllerServiceName;
    this.rpc = rpc;
    this.CreateVolume = this.CreateVolume.bind(this);
    this.DeleteVolume = this.DeleteVolume.bind(this);
    this.ControllerPublishVolume = this.ControllerPublishVolume.bind(this);
    this.ControllerUnpublishVolume = this.ControllerUnpublishVolume.bind(this);
    this.ValidateVolumeCapabilities = this.ValidateVolumeCapabilities.bind(this);
    this.ListVolumes = this.ListVolumes.bind(this);
    this.GetCapacity = this.GetCapacity.bind(this);
    this.ControllerGetCapabilities = this.ControllerGetCapabilities.bind(this);
    this.CreateSnapshot = this.CreateSnapshot.bind(this);
    this.DeleteSnapshot = this.DeleteSnapshot.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.ControllerExpandVolume = this.ControllerExpandVolume.bind(this);
    this.ControllerGetVolume = this.ControllerGetVolume.bind(this);
  }
  CreateVolume(request: CreateVolumeRequest, abortSignal?: AbortSignal): Promise<CreateVolumeResponse> {
    const data = CreateVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateVolume", data, abortSignal || undefined);
    return promise.then((data) => CreateVolumeResponse.decode(_m0.Reader.create(data)));
  }

  DeleteVolume(request: DeleteVolumeRequest, abortSignal?: AbortSignal): Promise<DeleteVolumeResponse> {
    const data = DeleteVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteVolume", data, abortSignal || undefined);
    return promise.then((data) => DeleteVolumeResponse.decode(_m0.Reader.create(data)));
  }

  ControllerPublishVolume(
    request: ControllerPublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerPublishVolumeResponse> {
    const data = ControllerPublishVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ControllerPublishVolume", data, abortSignal || undefined);
    return promise.then((data) => ControllerPublishVolumeResponse.decode(_m0.Reader.create(data)));
  }

  ControllerUnpublishVolume(
    request: ControllerUnpublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerUnpublishVolumeResponse> {
    const data = ControllerUnpublishVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ControllerUnpublishVolume", data, abortSignal || undefined);
    return promise.then((data) => ControllerUnpublishVolumeResponse.decode(_m0.Reader.create(data)));
  }

  ValidateVolumeCapabilities(
    request: ValidateVolumeCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<ValidateVolumeCapabilitiesResponse> {
    const data = ValidateVolumeCapabilitiesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidateVolumeCapabilities", data, abortSignal || undefined);
    return promise.then((data) => ValidateVolumeCapabilitiesResponse.decode(_m0.Reader.create(data)));
  }

  ListVolumes(request: ListVolumesRequest, abortSignal?: AbortSignal): Promise<ListVolumesResponse> {
    const data = ListVolumesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListVolumes", data, abortSignal || undefined);
    return promise.then((data) => ListVolumesResponse.decode(_m0.Reader.create(data)));
  }

  GetCapacity(request: GetCapacityRequest, abortSignal?: AbortSignal): Promise<GetCapacityResponse> {
    const data = GetCapacityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCapacity", data, abortSignal || undefined);
    return promise.then((data) => GetCapacityResponse.decode(_m0.Reader.create(data)));
  }

  ControllerGetCapabilities(
    request: ControllerGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerGetCapabilitiesResponse> {
    const data = ControllerGetCapabilitiesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ControllerGetCapabilities", data, abortSignal || undefined);
    return promise.then((data) => ControllerGetCapabilitiesResponse.decode(_m0.Reader.create(data)));
  }

  CreateSnapshot(request: CreateSnapshotRequest, abortSignal?: AbortSignal): Promise<CreateSnapshotResponse> {
    const data = CreateSnapshotRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSnapshot", data, abortSignal || undefined);
    return promise.then((data) => CreateSnapshotResponse.decode(_m0.Reader.create(data)));
  }

  DeleteSnapshot(request: DeleteSnapshotRequest, abortSignal?: AbortSignal): Promise<DeleteSnapshotResponse> {
    const data = DeleteSnapshotRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteSnapshot", data, abortSignal || undefined);
    return promise.then((data) => DeleteSnapshotResponse.decode(_m0.Reader.create(data)));
  }

  ListSnapshots(request: ListSnapshotsRequest, abortSignal?: AbortSignal): Promise<ListSnapshotsResponse> {
    const data = ListSnapshotsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListSnapshots", data, abortSignal || undefined);
    return promise.then((data) => ListSnapshotsResponse.decode(_m0.Reader.create(data)));
  }

  ControllerExpandVolume(
    request: ControllerExpandVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerExpandVolumeResponse> {
    const data = ControllerExpandVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ControllerExpandVolume", data, abortSignal || undefined);
    return promise.then((data) => ControllerExpandVolumeResponse.decode(_m0.Reader.create(data)));
  }

  ControllerGetVolume(
    request: ControllerGetVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<ControllerGetVolumeResponse> {
    const data = ControllerGetVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ControllerGetVolume", data, abortSignal || undefined);
    return promise.then((data) => ControllerGetVolumeResponse.decode(_m0.Reader.create(data)));
  }
}

export type ControllerDefinition = typeof ControllerDefinition;
export const ControllerDefinition = {
  name: "Controller",
  fullName: "csi.v1.Controller",
  methods: {
    createVolume: {
      name: "CreateVolume",
      requestType: CreateVolumeRequest,
      requestStream: false,
      responseType: CreateVolumeResponse,
      responseStream: false,
      options: {},
    },
    deleteVolume: {
      name: "DeleteVolume",
      requestType: DeleteVolumeRequest,
      requestStream: false,
      responseType: DeleteVolumeResponse,
      responseStream: false,
      options: {},
    },
    controllerPublishVolume: {
      name: "ControllerPublishVolume",
      requestType: ControllerPublishVolumeRequest,
      requestStream: false,
      responseType: ControllerPublishVolumeResponse,
      responseStream: false,
      options: {},
    },
    controllerUnpublishVolume: {
      name: "ControllerUnpublishVolume",
      requestType: ControllerUnpublishVolumeRequest,
      requestStream: false,
      responseType: ControllerUnpublishVolumeResponse,
      responseStream: false,
      options: {},
    },
    validateVolumeCapabilities: {
      name: "ValidateVolumeCapabilities",
      requestType: ValidateVolumeCapabilitiesRequest,
      requestStream: false,
      responseType: ValidateVolumeCapabilitiesResponse,
      responseStream: false,
      options: {},
    },
    listVolumes: {
      name: "ListVolumes",
      requestType: ListVolumesRequest,
      requestStream: false,
      responseType: ListVolumesResponse,
      responseStream: false,
      options: {},
    },
    getCapacity: {
      name: "GetCapacity",
      requestType: GetCapacityRequest,
      requestStream: false,
      responseType: GetCapacityResponse,
      responseStream: false,
      options: {},
    },
    controllerGetCapabilities: {
      name: "ControllerGetCapabilities",
      requestType: ControllerGetCapabilitiesRequest,
      requestStream: false,
      responseType: ControllerGetCapabilitiesResponse,
      responseStream: false,
      options: {},
    },
    createSnapshot: {
      name: "CreateSnapshot",
      requestType: CreateSnapshotRequest,
      requestStream: false,
      responseType: CreateSnapshotResponse,
      responseStream: false,
      options: {},
    },
    deleteSnapshot: {
      name: "DeleteSnapshot",
      requestType: DeleteSnapshotRequest,
      requestStream: false,
      responseType: DeleteSnapshotResponse,
      responseStream: false,
      options: {},
    },
    listSnapshots: {
      name: "ListSnapshots",
      requestType: ListSnapshotsRequest,
      requestStream: false,
      responseType: ListSnapshotsResponse,
      responseStream: false,
      options: {},
    },
    controllerExpandVolume: {
      name: "ControllerExpandVolume",
      requestType: ControllerExpandVolumeRequest,
      requestStream: false,
      responseType: ControllerExpandVolumeResponse,
      responseStream: false,
      options: {},
    },
    controllerGetVolume: {
      name: "ControllerGetVolume",
      requestType: ControllerGetVolumeRequest,
      requestStream: false,
      responseType: ControllerGetVolumeResponse,
      responseStream: false,
      options: { _unknownFields: { 8480: [new Uint8Array([1])] } },
    },
  },
} as const;

export interface GroupController {
  GroupControllerGetCapabilities(
    request: GroupControllerGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<GroupControllerGetCapabilitiesResponse>;
  CreateVolumeGroupSnapshot(
    request: CreateVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<CreateVolumeGroupSnapshotResponse>;
  DeleteVolumeGroupSnapshot(
    request: DeleteVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<DeleteVolumeGroupSnapshotResponse>;
  GetVolumeGroupSnapshot(
    request: GetVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<GetVolumeGroupSnapshotResponse>;
}

export const GroupControllerServiceName = "csi.v1.GroupController";
export class GroupControllerClientImpl implements GroupController {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || GroupControllerServiceName;
    this.rpc = rpc;
    this.GroupControllerGetCapabilities = this.GroupControllerGetCapabilities.bind(this);
    this.CreateVolumeGroupSnapshot = this.CreateVolumeGroupSnapshot.bind(this);
    this.DeleteVolumeGroupSnapshot = this.DeleteVolumeGroupSnapshot.bind(this);
    this.GetVolumeGroupSnapshot = this.GetVolumeGroupSnapshot.bind(this);
  }
  GroupControllerGetCapabilities(
    request: GroupControllerGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<GroupControllerGetCapabilitiesResponse> {
    const data = GroupControllerGetCapabilitiesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupControllerGetCapabilities", data, abortSignal || undefined);
    return promise.then((data) => GroupControllerGetCapabilitiesResponse.decode(_m0.Reader.create(data)));
  }

  CreateVolumeGroupSnapshot(
    request: CreateVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<CreateVolumeGroupSnapshotResponse> {
    const data = CreateVolumeGroupSnapshotRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateVolumeGroupSnapshot", data, abortSignal || undefined);
    return promise.then((data) => CreateVolumeGroupSnapshotResponse.decode(_m0.Reader.create(data)));
  }

  DeleteVolumeGroupSnapshot(
    request: DeleteVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<DeleteVolumeGroupSnapshotResponse> {
    const data = DeleteVolumeGroupSnapshotRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteVolumeGroupSnapshot", data, abortSignal || undefined);
    return promise.then((data) => DeleteVolumeGroupSnapshotResponse.decode(_m0.Reader.create(data)));
  }

  GetVolumeGroupSnapshot(
    request: GetVolumeGroupSnapshotRequest,
    abortSignal?: AbortSignal,
  ): Promise<GetVolumeGroupSnapshotResponse> {
    const data = GetVolumeGroupSnapshotRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetVolumeGroupSnapshot", data, abortSignal || undefined);
    return promise.then((data) => GetVolumeGroupSnapshotResponse.decode(_m0.Reader.create(data)));
  }
}

export type GroupControllerDefinition = typeof GroupControllerDefinition;
export const GroupControllerDefinition = {
  name: "GroupController",
  fullName: "csi.v1.GroupController",
  methods: {
    groupControllerGetCapabilities: {
      name: "GroupControllerGetCapabilities",
      requestType: GroupControllerGetCapabilitiesRequest,
      requestStream: false,
      responseType: GroupControllerGetCapabilitiesResponse,
      responseStream: false,
      options: {},
    },
    createVolumeGroupSnapshot: {
      name: "CreateVolumeGroupSnapshot",
      requestType: CreateVolumeGroupSnapshotRequest,
      requestStream: false,
      responseType: CreateVolumeGroupSnapshotResponse,
      responseStream: false,
      options: { _unknownFields: { 8480: [new Uint8Array([1])] } },
    },
    deleteVolumeGroupSnapshot: {
      name: "DeleteVolumeGroupSnapshot",
      requestType: DeleteVolumeGroupSnapshotRequest,
      requestStream: false,
      responseType: DeleteVolumeGroupSnapshotResponse,
      responseStream: false,
      options: { _unknownFields: { 8480: [new Uint8Array([1])] } },
    },
    getVolumeGroupSnapshot: {
      name: "GetVolumeGroupSnapshot",
      requestType: GetVolumeGroupSnapshotRequest,
      requestStream: false,
      responseType: GetVolumeGroupSnapshotResponse,
      responseStream: false,
      options: { _unknownFields: { 8480: [new Uint8Array([1])] } },
    },
  },
} as const;

export interface Node {
  NodeStageVolume(request: NodeStageVolumeRequest, abortSignal?: AbortSignal): Promise<NodeStageVolumeResponse>;
  NodeUnstageVolume(request: NodeUnstageVolumeRequest, abortSignal?: AbortSignal): Promise<NodeUnstageVolumeResponse>;
  NodePublishVolume(request: NodePublishVolumeRequest, abortSignal?: AbortSignal): Promise<NodePublishVolumeResponse>;
  NodeUnpublishVolume(
    request: NodeUnpublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeUnpublishVolumeResponse>;
  NodeGetVolumeStats(
    request: NodeGetVolumeStatsRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeGetVolumeStatsResponse>;
  NodeExpandVolume(request: NodeExpandVolumeRequest, abortSignal?: AbortSignal): Promise<NodeExpandVolumeResponse>;
  NodeGetCapabilities(
    request: NodeGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeGetCapabilitiesResponse>;
  NodeGetInfo(request: NodeGetInfoRequest, abortSignal?: AbortSignal): Promise<NodeGetInfoResponse>;
}

export const NodeServiceName = "csi.v1.Node";
export class NodeClientImpl implements Node {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || NodeServiceName;
    this.rpc = rpc;
    this.NodeStageVolume = this.NodeStageVolume.bind(this);
    this.NodeUnstageVolume = this.NodeUnstageVolume.bind(this);
    this.NodePublishVolume = this.NodePublishVolume.bind(this);
    this.NodeUnpublishVolume = this.NodeUnpublishVolume.bind(this);
    this.NodeGetVolumeStats = this.NodeGetVolumeStats.bind(this);
    this.NodeExpandVolume = this.NodeExpandVolume.bind(this);
    this.NodeGetCapabilities = this.NodeGetCapabilities.bind(this);
    this.NodeGetInfo = this.NodeGetInfo.bind(this);
  }
  NodeStageVolume(request: NodeStageVolumeRequest, abortSignal?: AbortSignal): Promise<NodeStageVolumeResponse> {
    const data = NodeStageVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeStageVolume", data, abortSignal || undefined);
    return promise.then((data) => NodeStageVolumeResponse.decode(_m0.Reader.create(data)));
  }

  NodeUnstageVolume(request: NodeUnstageVolumeRequest, abortSignal?: AbortSignal): Promise<NodeUnstageVolumeResponse> {
    const data = NodeUnstageVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeUnstageVolume", data, abortSignal || undefined);
    return promise.then((data) => NodeUnstageVolumeResponse.decode(_m0.Reader.create(data)));
  }

  NodePublishVolume(request: NodePublishVolumeRequest, abortSignal?: AbortSignal): Promise<NodePublishVolumeResponse> {
    const data = NodePublishVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodePublishVolume", data, abortSignal || undefined);
    return promise.then((data) => NodePublishVolumeResponse.decode(_m0.Reader.create(data)));
  }

  NodeUnpublishVolume(
    request: NodeUnpublishVolumeRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeUnpublishVolumeResponse> {
    const data = NodeUnpublishVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeUnpublishVolume", data, abortSignal || undefined);
    return promise.then((data) => NodeUnpublishVolumeResponse.decode(_m0.Reader.create(data)));
  }

  NodeGetVolumeStats(
    request: NodeGetVolumeStatsRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeGetVolumeStatsResponse> {
    const data = NodeGetVolumeStatsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeGetVolumeStats", data, abortSignal || undefined);
    return promise.then((data) => NodeGetVolumeStatsResponse.decode(_m0.Reader.create(data)));
  }

  NodeExpandVolume(request: NodeExpandVolumeRequest, abortSignal?: AbortSignal): Promise<NodeExpandVolumeResponse> {
    const data = NodeExpandVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeExpandVolume", data, abortSignal || undefined);
    return promise.then((data) => NodeExpandVolumeResponse.decode(_m0.Reader.create(data)));
  }

  NodeGetCapabilities(
    request: NodeGetCapabilitiesRequest,
    abortSignal?: AbortSignal,
  ): Promise<NodeGetCapabilitiesResponse> {
    const data = NodeGetCapabilitiesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeGetCapabilities", data, abortSignal || undefined);
    return promise.then((data) => NodeGetCapabilitiesResponse.decode(_m0.Reader.create(data)));
  }

  NodeGetInfo(request: NodeGetInfoRequest, abortSignal?: AbortSignal): Promise<NodeGetInfoResponse> {
    const data = NodeGetInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeGetInfo", data, abortSignal || undefined);
    return promise.then((data) => NodeGetInfoResponse.decode(_m0.Reader.create(data)));
  }
}

export type NodeDefinition = typeof NodeDefinition;
export const NodeDefinition = {
  name: "Node",
  fullName: "csi.v1.Node",
  methods: {
    nodeStageVolume: {
      name: "NodeStageVolume",
      requestType: NodeStageVolumeRequest,
      requestStream: false,
      responseType: NodeStageVolumeResponse,
      responseStream: false,
      options: {},
    },
    nodeUnstageVolume: {
      name: "NodeUnstageVolume",
      requestType: NodeUnstageVolumeRequest,
      requestStream: false,
      responseType: NodeUnstageVolumeResponse,
      responseStream: false,
      options: {},
    },
    nodePublishVolume: {
      name: "NodePublishVolume",
      requestType: NodePublishVolumeRequest,
      requestStream: false,
      responseType: NodePublishVolumeResponse,
      responseStream: false,
      options: {},
    },
    nodeUnpublishVolume: {
      name: "NodeUnpublishVolume",
      requestType: NodeUnpublishVolumeRequest,
      requestStream: false,
      responseType: NodeUnpublishVolumeResponse,
      responseStream: false,
      options: {},
    },
    nodeGetVolumeStats: {
      name: "NodeGetVolumeStats",
      requestType: NodeGetVolumeStatsRequest,
      requestStream: false,
      responseType: NodeGetVolumeStatsResponse,
      responseStream: false,
      options: {},
    },
    nodeExpandVolume: {
      name: "NodeExpandVolume",
      requestType: NodeExpandVolumeRequest,
      requestStream: false,
      responseType: NodeExpandVolumeResponse,
      responseStream: false,
      options: {},
    },
    nodeGetCapabilities: {
      name: "NodeGetCapabilities",
      requestType: NodeGetCapabilitiesRequest,
      requestStream: false,
      responseType: NodeGetCapabilitiesResponse,
      responseStream: false,
      options: {},
    },
    nodeGetInfo: {
      name: "NodeGetInfo",
      requestType: NodeGetInfoRequest,
      requestStream: false,
      responseType: NodeGetInfoResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array, abortSignal?: AbortSignal): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
