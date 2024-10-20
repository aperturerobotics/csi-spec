# Container Storage Interface (CSI) Specification ![build status](https://github.com/container-storage-interface/spec/actions/workflows/build.yaml/badge.svg)

![CSI Logo](logo.png)

This project contains the CSI [specification](spec.md) and [protobuf](csi.proto) files.

## Fork

This [project fork](https://github.com/aperturerobotics/csi-spec) contains the
proto files generated to TypeScript and Go / VTProtobuf using the
[protobuf-project](https://github.com/aperturerobotics/protobuf-project)
Makefile and configs.

It is available as an `npm` package at `@aperturerobotics/csi-spec`.

[Upstream project](https://github.com/container-storage-interface/spec)

## CSI Adoption

### Container Orchestrators (CO)

* [Cloud Foundry](https://github.com/cloudfoundry/csi-plugins-release/blob/master/CSI_SUPPORT.md)
* [Kubernetes](https://kubernetes-csi.github.io/docs/)
* [Mesos](http://mesos.apache.org/documentation/latest/csi/)
* [Nomad](https://nomadproject.io/docs/internals/plugins/csi/)
