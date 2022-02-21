ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.8"

lazy val root = (project in file("."))
  .settings(
    name := "akka-grpc-web-testcase"
  )

// in build.sbt:
enablePlugins(AkkaGrpcPlugin)

libraryDependencies += "ch.megard" %% "akka-http-cors" % "0.4.2"
