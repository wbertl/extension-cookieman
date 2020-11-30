# load TrackingObjects. Extend them in your site package/extension/... as needed.
<INCLUDE_TYPOSCRIPT: source="DIR:EXT:cookieman/Configuration/TypoScript/TrackingObjects/" extensions="typoscript">

plugin.tx_cookieman {
    # see documentation: https://github.com/dmind-gmbh/extension-cookieman
    settings {
        links {
            dataProtectionDeclarationPid = {$plugin.tx_cookieman.settings.links.dataProtectionDeclarationPid}
            dataProtectionDeclarationAnchor = {$plugin.tx_cookieman.settings.links.dataProtectionDeclarationAnchor}
            imprintPid = {$plugin.tx_cookieman.settings.links.imprintPid}
            imprintAnchor = {$plugin.tx_cookieman.settings.links.imprintAnchor}
        }

        groups {
            mandatory {
                preselected = 1
                disabled = 1
                trackingObjects {
                    0 = CookieConsent
                    1 = fe_typo_user
                }
            }

            marketing {
                trackingObjects {
                    0 = Matomo
                    1 = GoogleAnalytics
                    2 = GoogleTagManager
                    3 = Bing
                }

                respectDnt = 1
                showDntMessage = 1
            }
        }
    }
}

page {
    includeJSFooter {
        cookie-js = EXT:cookieman/Resources/Public/Js/js.cookie-2.2.0.min.js
        cookieman = EXT:cookieman/Resources/Public/Js/cookieman.min.js
        cookieman-theme = {$plugin.tx_cookieman.settings.resourcesBasePath}/Public/Themes/{$plugin.tx_cookieman.settings.theme}/cookieman-theme.min.js
        cookieman-init = EXT:cookieman/Resources/Public/Js/cookieman-init.min.js
    }

    includeCSS {
        cookieman-theme = {$plugin.tx_cookieman.settings.resourcesBasePath}/Public/Themes/{$plugin.tx_cookieman.settings.theme}/cookieman-theme.min.css
    }

    1365499 = FLUIDTEMPLATE
    1365499 {
        templateName = Popup
        templateRootPaths {
            0 = EXT:cookieman/Resources/Private/Templates/
            10 = EXT:cookieman/Resources/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Templates/
            100 = {$plugin.tx_cookieman.settings.resourcesBasePath}/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Templates/
        }

        partialRootPaths {
            0 = EXT:cookieman/Resources/Private/Partials/
            10 = EXT:cookieman/Resources/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Partials/
            100 = {$plugin.tx_cookieman.settings.resourcesBasePath}/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Partials/
        }

        layoutRootPaths {
            0 = EXT:cookieman/Resources/Private/Layouts/
            10 = EXT:cookieman/Resources/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Layouts/
            100 = {$plugin.tx_cookieman.settings.resourcesBasePath}/Private/Themes/{$plugin.tx_cookieman.settings.theme}/Layouts/
        }

        // allows to omit extension name in f:translate ViewHelpers
        extbase.controllerExtensionName = cookieman

        # evaluate settings during rendering. With FLUIDTEMPLATE.settings we would prevent overwritability
        dataProcessing {
            1 = Dmind\Cookieman\DataProcessing\TypoScriptSettingsProcessor
        }
    }
}

[globalVar = LIT:0 = {$plugin.tx_cookieman.settings.minify}]
page {
    includeJSFooter {
        cookieman := removeString(.min)
        cookieman-theme := removeString(.min)
        cookieman-init := removeString(.min)
    }

    includeCSS {
        cookieman-theme := removeString(.min)
    }
}
[end]
