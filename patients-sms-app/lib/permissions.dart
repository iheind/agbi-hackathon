import 'package:permission_handler/permission_handler.dart';

Future<void> getSMSPermission() async {
  return getPermission(Permission.sms);
}

Future<void> getPermission(Permission x) async {
  if (await x.status.isDenied || await x.status.isUndetermined) {
    await x.request();
  } else {
    if (await x.status.isPermanentlyDenied || await x.status.isRestricted) {
      openAppSettings();
    }
  }
}
