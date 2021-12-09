package com.covid.zxop

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.covid.zxop.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    lateinit var mainActivityMainBinding: ActivityMainBinding

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainActivityMainBinding = ActivityMainBinding.inflate(layoutInflater)
        val viewMain = mainActivityMainBinding.root
        setContentView(viewMain)

        if(!isOnline(this)) {
            Toast.makeText(this, "Internet not available", Toast.LENGTH_SHORT).show()
            finish()
        }

        mainActivityMainBinding.webView.settings.javaScriptEnabled = true
        mainActivityMainBinding.webView.webViewClient = MyWebViewClient()
        mainActivityMainBinding.webView.webChromeClient = MyWebChromeClient()
        mainActivityMainBinding.webView.loadUrl(getString(R.string.web_app_link))

    }

    inner class MyWebViewClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
            if (Uri.parse(url).host == "underground-hip-hop-artist.blogspot.com")
                return false
            Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                startActivity(this)
            }
            return true
        }
    }

    // this class will perform loading of website in app.
    inner class MyWebChromeClient : WebChromeClient() {
        override fun onProgressChanged(view: WebView?, newProgress: Int) {
            super.onProgressChanged(view, newProgress)
            if (newProgress < 100 && mainActivityMainBinding.progressBar.visibility == View.GONE) {
                mainActivityMainBinding.progressBar.visibility = View.VISIBLE;
            }
            mainActivityMainBinding.progressBar.progress = newProgress;
            if (newProgress == 100) {
                mainActivityMainBinding.progressBar.visibility = View.GONE;
            }
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        // Check if the key event was the Back button and if there's history
        if (keyCode == KeyEvent.KEYCODE_BACK && mainActivityMainBinding.webView.canGoBack()) {
            mainActivityMainBinding.webView.goBack()
            return true
        }
        // If it wasn't the Back key or there's no web page history, bubble up to the default
        // system behavior (probably exit the activity)
        return super.onKeyDown(keyCode, event)
    }

    // it will let us know if network is available.
    private fun isOnline(context: Context): Boolean {
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo = connectivityManager.activeNetworkInfo
        return networkInfo != null && networkInfo.isConnected
    }

}