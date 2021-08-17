require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ton-nfc-client"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = "React native module to handle TON Labs NFC card"
  s.homepage     = "https://github.com/tonlabs/ton-nfc-client"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "alinaT95" => "alina.t@tonlabs.io" }
  s.platforms    = { :ios => "11.0" }
  s.ios.deployment_target = '11.0'
  s.source       = { :git => "https://github.com/tonlabs/ton-nfc-client.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "TonNfcClientSwift", "~> 1.2.0"
  # ...
  # s.dependency "..."
end

