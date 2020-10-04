import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter_app/permissions.dart';
import 'package:flutter_app/pit_sms_call_log.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  List<SmsLog> messages;
  List<String> messagesToDisplay;
  int length = 0;

  void getSMS() async {
    messages = await PitSmsCallLog.getSmsLog(daysBefore: 10);
  }

  void filter() {
    if (messages != null) {
      messagesToDisplay = new List<String>(messages.length);
      int j = 0;
      for (int i = 0; i < messages.length; i++) {
        if (messages[i].body.contains("9566761938", 0)) {
          messagesToDisplay[j] = messages[i].body;
          j++;
        }
      }
      setState(() {
        length = j;
      });
    } else {
      setState(() {
        getSMS();
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getSMSPermission();
    setState(() {
      getSMS();
    });
  }

  @override
  Widget build(BuildContext context) {
    filter();
    Future.delayed(Duration(milliseconds: 500), () {
      filter();
      Future.delayed(Duration(milliseconds: 500), () {
        filter();
      });
    });
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Notifications"),
          backgroundColor: Colors.black,
        ),
        body: Container(
          color: Colors.black,
          child: ListView.builder(
            itemCount: length,
            itemBuilder: (context, index) {
              return Container(
                margin:
                    EdgeInsets.all(MediaQuery.of(context).size.width * 0.05),
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15)),
                height: MediaQuery.of(context).size.width * 0.42,
                width: MediaQuery.of(context).size.width * 0.8,
                padding: EdgeInsets.all(15),
                child: Center(
                    child: Text(
                  messagesToDisplay[index],
                )),
              );
            },
          ),
        ),
      ),
    );
  }
}
